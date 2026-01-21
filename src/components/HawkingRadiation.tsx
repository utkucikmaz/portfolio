/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'

let sharedGlowMap: THREE.Texture | null = null

function createRadialGradientTexture(): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    const fallback = new THREE.Texture()
    fallback.needsUpdate = true
    return fallback
  }

  const center = size / 2
  const gradient = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    center
  )
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.25, 'rgba(255,255,255,0.9)')
  gradient.addColorStop(0.55, 'rgba(255,255,255,0.35)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function getSharedGlowMap(): THREE.Texture | null {
  if (typeof document === 'undefined') return null
  if (!sharedGlowMap) sharedGlowMap = createRadialGradientTexture()
  return sharedGlowMap
}

function randomUnitVectorInto(out: THREE.Vector3): THREE.Vector3 {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const z = 2 * v - 1
  const r = Math.sqrt(Math.max(0, 1 - z * z))
  out.set(r * Math.cos(theta), r * Math.sin(theta), z)
  return out
}

const BASIS_HELPER_Z = new THREE.Vector3(0, 0, 1)
const BASIS_HELPER_Y = new THREE.Vector3(0, 1, 0)

function useDocumentDarkMode(): boolean {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    const root = document.documentElement
    const update = () => setIsDarkMode(root.classList.contains('dark'))

    update()

    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return isDarkMode
}

function StarField({
  isDarkMode,
  count = 1200,
}: {
  isDarkMode: boolean
  count?: number
}) {
  const { camera, gl } = useThree()

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)

    const paletteDark = [
      new THREE.Color('#f8fafc'),
      new THREE.Color('#e0f2fe'),
      new THREE.Color('#fef3c7'),
      new THREE.Color('#ddd6fe'),
    ]
    const paletteLight = [
      new THREE.Color('#000000'),
      new THREE.Color('#1a1a1a'),
      new THREE.Color('#87CEEB'),
      new THREE.Color('#B0E0E6'),
    ]
    const palette = isDarkMode ? paletteDark : paletteLight

    const v = new THREE.Vector3()
    for (let i = 0; i < count; i++) {
      const ndcX = (Math.random() * 2 - 1) * 1.15
      const ndcY = (Math.random() * 2 - 1) * 1.15
      const ndcZ = 0.4 + Math.random() * 0.55

      v.set(ndcX, ndcY, ndcZ).unproject(camera)

      pos[i * 3 + 0] = v.x
      pos[i * 3 + 1] = v.y
      pos[i * 3 + 2] = v.z

      const base = palette[(Math.random() * palette.length) | 0]!
      const tint = 0.85 + Math.random() * 0.3
      col[i * 3 + 0] = base.r * tint
      col[i * 3 + 1] = base.g * tint
      col[i * 3 + 2] = base.b * tint

      siz[i] = isDarkMode
        ? 2.0 + Math.random() * 2.0
        : 3.2 + Math.random() * 2.8
    }

    return { positions: pos, colors: col, sizes: siz }
  }, [camera, count, isDarkMode])

  const material = useMemo(() => {
    const pixelRatio = gl.getPixelRatio()

    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uPixelRatio: { value: pixelRatio },
        uBaseOpacity: { value: isDarkMode ? 0.6 : 1.2 },
        uIsDarkMode: { value: isDarkMode ? 1 : 0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying vec2 vNdc;
        varying float vSize;

        uniform float uPixelRatio;
        uniform float uIsDarkMode;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vec4 clip = projectionMatrix * mvPosition;
          vNdc = clip.xy / clip.w;
          vColor = aColor;
          vSize = aSize;
          gl_Position = clip;
          gl_PointSize = aSize * uPixelRatio;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying vec2 vNdc;
        varying float vSize;

        uniform float uBaseOpacity;

        float smoothCircle(vec2 uv, float radius, float softness) {
          float d = length(uv - vec2(0.5));
          return smoothstep(radius, radius - softness, d);
        }

        void main() {
          // Soft round star
          float core = smoothCircle(gl_PointCoord, 0.5, 0.22);
          // Slight glow, more visible for larger points
          float glow = smoothCircle(gl_PointCoord, 0.5, 0.38) * 0.6;
          float shape = clamp(core + glow, 0.0, 1.0);

          // Fade near container edges (vignette) - more aggressive fade on all edges
          // Clamp NDC to handle any edge cases
          vec2 clampedNdc = clamp(vNdc, vec2(-1.5), vec2(1.5));
          float edgeDist = 1.0 - max(abs(clampedNdc.x), abs(clampedNdc.y));
          float vignette = smoothstep(0.0, 0.75, edgeDist);
          float bottomFade = smoothstep(-1.5, -0.3, clampedNdc.y);

          float alpha = uBaseOpacity * shape * vignette * bottomFade;
          if (alpha <= 0.001) discard;

          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    })
  }, [gl, isDarkMode])

  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  return (
    <points frustumCulled={false} renderOrder={-10}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-aColor'
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach='attributes-aSize'
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={material} attach='material' />
    </points>
  )
}

function Pair({
  collisionIntensityRef,
  collisionPositionRef,
  isDarkMode,
  initialSpawnPosition,
  isAutoSpawn = false,
  onComplete,
}: {
  collisionIntensityRef?: React.MutableRefObject<number>
  collisionPositionRef?: React.MutableRefObject<THREE.Vector3>
  isDarkMode: boolean
  initialSpawnPosition?: THREE.Vector3
  isAutoSpawn?: boolean
  onComplete?: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const matter = useRef<THREE.Mesh>(null)
  const antimatter = useRef<THREE.Mesh>(null)
  const matterGlow = useRef<THREE.Sprite>(null)
  const antimatterGlow = useRef<THREE.Sprite>(null)
  const flashSprite = useRef<THREE.Sprite>(null)
  const burst = useRef<THREE.Points>(null)

  const timeRef = useRef(0)
  const angleRef = useRef(0)
  const prevLoopTimeRef = useRef(0)
  const hasCompletedRef = useRef(false)
  const spawnPositionRef = useRef(
    initialSpawnPosition?.clone() ??
      new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 0)
  )

  const baseNormalRef = useRef<THREE.Vector3>(
    randomUnitVectorInto(new THREE.Vector3())
  )
  const precessionAxisRef = useRef<THREE.Vector3>(
    randomUnitVectorInto(new THREE.Vector3())
  )
  const wobbleAxisRef = useRef<THREE.Vector3>(
    randomUnitVectorInto(new THREE.Vector3())
  )
  const wobbleFreqRef = useRef<number>(2)
  const wobbleAmpRef = useRef<number>(0.12)
  const wobblePhaseRef = useRef<number>(Math.random() * Math.PI * 2)
  const precessionSpeedRef = useRef<number>(0.15)
  const baseSpeedRef = useRef<number>(1.6)
  const maxSpeedMultiplierRef = useRef<number>(18)
  const speedWobblePhaseRef = useRef<number>(Math.random() * Math.PI * 2)
  const speedWobbleFreqRef = useRef<number>(1.4)

  const burstCount = 90
  const burstDirs = useRef<Float32Array>(new Float32Array(burstCount * 3))
  const burstColors = useRef<Float32Array>(new Float32Array(burstCount * 3))
  const burstPositions = useRef<Float32Array>(new Float32Array(burstCount * 3))
  const burstPositionAttrRef = useRef<THREE.BufferAttribute | null>(null)

  const glowMap = useMemo(() => {
    return getSharedGlowMap()
  }, [])

  const matterColor = useMemo(
    () => new THREE.Color(isDarkMode ? '#ffcc66' : '#b45309'),
    [isDarkMode]
  )
  const antimatterColor = useMemo(
    () => new THREE.Color(isDarkMode ? '#38e8d1' : '#0369a1'),
    [isDarkMode]
  )

  const whiteColor = useMemo(
    () => new THREE.Color(isDarkMode ? '#ffffff' : '#0f172a'),
    [isDarkMode]
  )

  const flashColor = useMemo(
    () => new THREE.Color(isDarkMode ? '#ffffff' : '#0f172a'),
    [isDarkMode]
  )

  const tmpVecA = useRef<THREE.Vector3>(new THREE.Vector3())
  const tmpVecB = useRef<THREE.Vector3>(new THREE.Vector3())
  const tmpVecNormal = useRef<THREE.Vector3>(new THREE.Vector3())
  const tmpOrbitOffset = useRef<THREE.Vector3>(new THREE.Vector3())

  const matterGeometry = useMemo(
    () => new THREE.SphereGeometry(isDarkMode ? 0.055 : 0.06, 32, 32),
    [isDarkMode]
  )
  const antimatterGeometry = useMemo(
    () => new THREE.SphereGeometry(isDarkMode ? 0.055 : 0.06, 32, 32),
    [isDarkMode]
  )

  useEffect(() => {
    if (!burst.current) return
    burstPositionAttrRef.current = burst.current.geometry.getAttribute(
      'position'
    ) as THREE.BufferAttribute
  }, [])

  useFrame((_, delta) => {
    timeRef.current += delta

    if (!matter.current || !antimatter.current || !group.current) return

    const cycleDuration = 5.2
    const loopTime = timeRef.current % cycleDuration

    if (loopTime < prevLoopTimeRef.current) {
      angleRef.current = 0
      if (isAutoSpawn) {
        spawnPositionRef.current.set(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 0.35
        )
      }

      randomUnitVectorInto(baseNormalRef.current)

      const tmpA = tmpVecA.current
      const tmpB = tmpVecB.current
      const normal = tmpVecNormal.current.copy(baseNormalRef.current)

      randomUnitVectorInto(tmpA)
      precessionAxisRef.current.copy(tmpA)
      tmpB.copy(normal).multiplyScalar(precessionAxisRef.current.dot(normal))
      precessionAxisRef.current.sub(tmpB).normalize()

      randomUnitVectorInto(tmpB)
      wobbleAxisRef.current.copy(tmpB)
      tmpA.copy(normal).multiplyScalar(wobbleAxisRef.current.dot(normal))
      wobbleAxisRef.current.sub(tmpA).normalize()

      wobbleFreqRef.current = 1.1 + Math.random() * 2.4
      wobbleAmpRef.current = 0.06 + Math.random() * 0.16
      wobblePhaseRef.current = Math.random() * Math.PI * 2
      precessionSpeedRef.current = (Math.random() - 0.5) * 0.45

      baseSpeedRef.current = 1.1 + Math.random() * 1.4
      maxSpeedMultiplierRef.current = 12 + Math.random() * 14
      speedWobblePhaseRef.current = Math.random() * Math.PI * 2
      speedWobbleFreqRef.current = 0.9 + Math.random() * 1.6

      const d = tmpVecA.current
      for (let i = 0; i < burstCount; i++) {
        randomUnitVectorInto(d)
        burstDirs.current[i * 3 + 0] = d.x
        burstDirs.current[i * 3 + 1] = d.y
        burstDirs.current[i * 3 + 2] = d.z

        const pick = Math.random()
        const c =
          pick < 0.42 ? matterColor : pick < 0.84 ? antimatterColor : whiteColor
        burstColors.current[i * 3 + 0] = c.r
        burstColors.current[i * 3 + 1] = c.g
        burstColors.current[i * 3 + 2] = c.b
      }
    }
    prevLoopTimeRef.current = loopTime

    group.current.position.copy(spawnPositionRef.current)

    const splitDuration = 0.4
    const splitProgress = Math.min(loopTime / splitDuration, 1)

    const spiralStart = splitDuration
    const spiralDuration = 3.5
    const spiralProgress = Math.max(
      0,
      Math.min((loopTime - spiralStart) / spiralDuration, 1)
    )

    const collisionStart = spiralStart + spiralDuration
    const collisionDuration = 0.3
    const collisionProgress = Math.max(
      0,
      Math.min((loopTime - collisionStart) / collisionDuration, 1)
    )

    const inPause = loopTime > collisionStart + collisionDuration

    if (
      !isAutoSpawn &&
      onComplete &&
      collisionProgress >= 1 &&
      !hasCompletedRef.current
    ) {
      hasCompletedRef.current = true
      onComplete()
    }

    let radius = 0
    if (splitProgress < 1) {
      radius = THREE.MathUtils.lerp(0, 0.8, splitProgress * splitProgress)
    } else if (spiralProgress < 1) {
      const easedSpiral = spiralProgress * spiralProgress
      radius = THREE.MathUtils.lerp(0.8, 0, easedSpiral)
    } else {
      radius = THREE.MathUtils.lerp(0.05, 0, collisionProgress)
    }

    const baseSpeed = baseSpeedRef.current
    const maxSpeedMultiplier = maxSpeedMultiplierRef.current
    const normalizedRadius = radius / 0.8
    const speedMultiplier =
      1 + Math.pow(1 - normalizedRadius, 3) * (maxSpeedMultiplier - 1)
    const speedWobble =
      1 +
      0.08 *
        Math.sin(
          timeRef.current * speedWobbleFreqRef.current +
            speedWobblePhaseRef.current
        )
    const angularVelocity = baseSpeed * speedMultiplier * speedWobble

    angleRef.current += angularVelocity * delta
    const angle = angleRef.current

    const precessionAngle =
      (loopTime - spiralStart) * precessionSpeedRef.current
    const wobbleAngle =
      Math.sin(
        timeRef.current * wobbleFreqRef.current + wobblePhaseRef.current
      ) * wobbleAmpRef.current

    const n = tmpVecNormal.current.copy(baseNormalRef.current).normalize()
    n.applyAxisAngle(precessionAxisRef.current, precessionAngle)
    n.applyAxisAngle(wobbleAxisRef.current, wobbleAngle)
    n.normalize()

    const u = tmpVecA.current
    const v = tmpVecB.current
    const helper = Math.abs(n.z) < 0.9 ? BASIS_HELPER_Z : BASIS_HELPER_Y
    u.crossVectors(helper, n).normalize()
    v.crossVectors(n, u).normalize()

    const orbitOffset = tmpOrbitOffset.current
    orbitOffset.copy(u).multiplyScalar(Math.cos(angle) * radius)
    orbitOffset.addScaledVector(v, Math.sin(angle) * radius)

    matter.current.position.copy(orbitOffset)
    antimatter.current.position.copy(orbitOffset).multiplyScalar(-1)

    const matterMaterial = matter.current.material as THREE.MeshStandardMaterial
    const antimatterMaterial = antimatter.current
      .material as THREE.MeshStandardMaterial

    let opacity = 0
    let dotScale = 1

    if (inPause) {
      opacity = 0
      dotScale = 0
    } else if (collisionProgress > 0) {
      opacity = 1 - collisionProgress
      dotScale = 1 - collisionProgress * 0.8
    } else if (splitProgress < 1) {
      opacity = splitProgress
      dotScale = splitProgress
    } else {
      opacity = 1
      dotScale = 1
    }

    matterMaterial.opacity = opacity
    antimatterMaterial.opacity = opacity

    matter.current.scale.setScalar(dotScale)
    antimatter.current.scale.setScalar(dotScale)

    const glow = 0.9 + spiralProgress * 3.6

    const pop =
      collisionProgress > 0
        ? Math.pow(Math.sin(collisionProgress * Math.PI), 2) * 7
        : 0
    matterMaterial.emissiveIntensity = glow + pop
    antimatterMaterial.emissiveIntensity = glow + pop

    if (collisionIntensityRef && collisionPositionRef) {
      if (collisionProgress > 0) {
        collisionIntensityRef.current = Math.sin(collisionProgress * Math.PI)
        collisionPositionRef.current.copy(spawnPositionRef.current)
      } else {
        collisionIntensityRef.current = 0
      }
    }

    if (matterGlow.current) {
      matterGlow.current.position.copy(matter.current.position)
      matterGlow.current.scale.setScalar(
        (isDarkMode ? 0.34 : 0.31) * (0.6 + dotScale)
      )
      matterGlow.current.material.opacity = (isDarkMode ? 0.38 : 0.2) * opacity
    }
    if (antimatterGlow.current) {
      antimatterGlow.current.position.copy(antimatter.current.position)
      antimatterGlow.current.scale.setScalar(
        (isDarkMode ? 0.34 : 0.31) * (0.6 + dotScale)
      )
      antimatterGlow.current.material.opacity =
        (isDarkMode ? 0.38 : 0.2) * opacity
    }

    if (flashSprite.current) {
      const intensity =
        collisionProgress > 0 ? Math.sin(collisionProgress * Math.PI) : 0
      const flash = Math.pow(intensity, 1.6)
      flashSprite.current.visible = flash > 0.001
      flashSprite.current.scale.setScalar(0.12 + flash * 0.65)
      flashSprite.current.material.opacity = (isDarkMode ? 0.9 : 0.55) * flash
    }

    if (burst.current) {
      const intensity =
        collisionProgress > 0 ? Math.sin(collisionProgress * Math.PI) : 0
      const t = collisionProgress
      const ease = 1 - Math.pow(1 - t, 3)
      const burstRadius = 0.05 + ease * 0.9
      const burstOpacity = (isDarkMode ? 0.75 : 0.4) * Math.pow(intensity, 1.2)

      burst.current.visible = burstOpacity > 0.002

      const attr = burstPositionAttrRef.current ?? undefined
      if (attr) {
        for (let i = 0; i < burstCount; i++) {
          burstPositions.current[i * 3 + 0] =
            burstDirs.current[i * 3 + 0]! * burstRadius
          burstPositions.current[i * 3 + 1] =
            burstDirs.current[i * 3 + 1]! * burstRadius
          burstPositions.current[i * 3 + 2] =
            burstDirs.current[i * 3 + 2]! * burstRadius
        }
        attr.needsUpdate = true
      }

      const mat = burst.current.material as THREE.PointsMaterial
      mat.opacity = burstOpacity
    }
  })

  return (
    <group ref={group}>
      <mesh ref={matter} geometry={matterGeometry}>
        <meshStandardMaterial
          color={matterColor}
          emissive={matterColor}
          emissiveIntensity={1}
          transparent
          opacity={0}
        />
      </mesh>

      <mesh ref={antimatter} geometry={antimatterGeometry}>
        <meshStandardMaterial
          color={antimatterColor}
          emissive={antimatterColor}
          emissiveIntensity={1}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Soft sprite glow around each dot */}
      <sprite ref={matterGlow}>
        <spriteMaterial
          map={glowMap ?? undefined}
          color={matterColor}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <sprite ref={antimatterGlow}>
        <spriteMaterial
          map={glowMap ?? undefined}
          color={antimatterColor}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* Annihilation: center flash + expanding additive particle burst */}
      <sprite ref={flashSprite} visible={false}>
        <spriteMaterial
          map={glowMap ?? undefined}
          color={flashColor}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <points
        ref={burst}
        visible={false}
        frustumCulled={false}
        renderOrder={10}
      >
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            array={burstPositions.current}
            count={burstPositions.current.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-color'
            array={burstColors.current}
            count={burstColors.current.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={glowMap ?? undefined}
          transparent
          opacity={0}
          size={isDarkMode ? 0.065 : 0.055}
          sizeAttenuation
          depthWrite={false}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function HawkingRadiation() {
  const isDarkMode = useDocumentDarkMode()
  const collisionIntensityRef = useRef(0)
  const collisionPositionRef = useRef(new THREE.Vector3())
  const [clickedPairs, setClickedPairs] = useState<
    Array<{ id: number; position: THREE.Vector3 }>
  >([])
  const pairIdCounter = useRef(0)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    const clickPosition = new THREE.Vector3(
      x * 1.5,
      y * 1.5,
      (Math.random() - 0.5) * 0.35
    )

    setClickedPairs((prev) => [
      ...prev,
      {
        id: pairIdCounter.current++,
        position: clickPosition,
      },
    ])
  }

  return (
    <div
      ref={canvasRef}
      className='w-full h-full cursor-pointer min-h-[400px] sm:min-h-[400px]'
      onClick={handleClick}
    >
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }} dpr={[1, 2]}>
        <StarField isDarkMode={isDarkMode} count={250} />

        {/* Render automatic particle pair */}
        <Pair
          collisionIntensityRef={collisionIntensityRef}
          collisionPositionRef={collisionPositionRef}
          isDarkMode={isDarkMode}
          isAutoSpawn={true}
        />

        {/* Render clicked pairs */}
        {clickedPairs.map((pair) => (
          <Pair
            key={pair.id}
            isDarkMode={isDarkMode}
            initialSpawnPosition={pair.position}
            isAutoSpawn={false}
            onComplete={() => {
              setClickedPairs((prev) => prev.filter((p) => p.id !== pair.id))
            }}
          />
        ))}

        <ambientLight intensity={isDarkMode ? 0.12 : 0.25} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  )
}
