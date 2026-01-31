import { useEffect, useRef, memo } from 'react'
import {
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three'

type BackgroundThreeProps = {
  isDarkMode: boolean
}

function clampDpr(dpr: number) {
  return Math.min(Math.max(dpr, 1), 1.4)
}

function getScrollProgress() {
  const doc = document.documentElement
  const max = Math.max(1, doc.scrollHeight - window.innerHeight)
  return Math.min(1, Math.max(0, window.scrollY / max))
}

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const getFragmentShader = (isLowPower: boolean) => `
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uTheme;
uniform float uScroll;
uniform vec2 uMouse;
uniform float uOpacity;
varying vec2 vUv;

#define TREES ${isLowPower ? 3 : 5}
#define BRANCHES ${isLowPower ? 2 : 3}

// Simple noise functions for organic feel
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for(int i = 0; i < 3; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// Tree branch pattern
float treeBranch(vec2 uv, vec2 start, vec2 direction, float length, float thickness) {
  vec2 pos = uv - start;
  float angle = atan(direction.y, direction.x);
  float c = cos(angle);
  float s = sin(angle);

  // Rotate point to align with branch direction
  vec2 rotated = vec2(
    pos.x * c + pos.y * s,
    -pos.x * s + pos.y * c
  );

  // Create branch shape
  float dist = abs(rotated.y);
  float along = rotated.x;

  // Branch tapers and has some organic variation
  float taper = 1.0 - smoothstep(0.0, length, along);
  float organic = fbm(rotated * 8.0 + uTime * 0.12) * 0.3;
  taper *= (1.0 + organic);

  float branch = smoothstep(thickness + 0.01, thickness - 0.01, dist / taper);
  branch *= smoothstep(-0.1, 0.0, along) * smoothstep(length + 0.1, length, along);

  return branch;
}

void main() {
  vec2 uv = vUv;
  vec2 st = uv;

  // Theme-aware base colors (very subtle)
  vec3 branchColorLight = vec3(0.85, 0.9, 0.95);  // Soft gray-blue for light mode
  vec3 branchColorDark = vec3(0.15, 0.25, 0.4);   // Dark blue-gray for dark mode
  vec3 branchColor = mix(branchColorLight, branchColorDark, uTheme);

  vec3 glowColorLight = vec3(0.9, 0.95, 1.0);     // Soft white glow for light mode
  vec3 glowColorDark = vec3(0.3, 0.5, 0.8);       // Blue glow for dark mode
  vec3 glowColor = mix(glowColorLight, glowColorDark, uTheme);

  float branches = 0.0;
  float glow = 0.0;

  // Create multiple branching trees from bottom of screen
  for(int tree = 0; tree < TREES; tree++) {
    vec2 treeRoot = vec2(0.1 + float(tree) * 0.2 + hash(vec2(float(tree), 0.0)) * 0.1, 0.05);

    // Subtle mouse influence on growth direction (wind-like, with vertical following)
    vec2 mouseDir = normalize(uMouse - treeRoot);
    vec2 baseDir = vec2(0.0, 1.0); // Grow upward
    vec2 growthDir = normalize(mix(baseDir, mouseDir, 0.18));

    // Main trunk with stretching effect based on mouse
    float mouseDistToTree = distance(treeRoot, uMouse);
    float stretchFactor = 1.0 + (1.0 - smoothstep(0.0, 0.5, mouseDistToTree)) * 0.22;
    float trunkLength = (0.3 + uScroll * 0.4 + sin(uTime * 0.45 + float(tree)) * 0.1) * stretchFactor;
    float trunkThickness = 0.008;
    branches += treeBranch(st, treeRoot, growthDir, trunkLength, trunkThickness);

    // Branches
    vec2 currentPos = treeRoot + growthDir * trunkLength * 0.6;
    for(int branch = 0; branch < BRANCHES; branch++) {
      float branchAngle = (float(branch) - 1.0) * 0.8 + sin(uTime * 0.28 + float(tree + branch)) * 0.3;
      vec2 branchDir = vec2(sin(branchAngle), cos(branchAngle));
      branchDir = normalize(mix(branchDir, mouseDir, 0.12));

      float branchStretch = 1.0 + (1.0 - smoothstep(0.0, 0.4, distance(currentPos, uMouse))) * 0.18;
      float branchLength = (0.15 + uScroll * 0.2 + hash(vec2(float(tree), float(branch))) * 0.1) * branchStretch;
      float branchThickness = 0.004;
      branches += treeBranch(st, currentPos, branchDir, branchLength, branchThickness);

      // Sub-branches
      vec2 subPos = currentPos + branchDir * branchLength * 0.7;
      for(int sub = 0; sub < 2; sub++) {
        float subAngle = branchAngle + (float(sub) - 0.5) * 1.2 + sin(uTime * 0.35 + float(tree + branch + sub)) * 0.2;
        vec2 subDir = vec2(sin(subAngle), cos(subAngle));
        subDir = normalize(mix(subDir, mouseDir, 0.08));

        float subStretch = 1.0 + (1.0 - smoothstep(0.0, 0.3, distance(subPos, uMouse))) * 0.15;
        float subLength = (0.08 + uScroll * 0.1) * subStretch;
        float subThickness = 0.002;
        branches += treeBranch(st, subPos, subDir, subLength, subThickness);
      }
    }
  }

  // Add subtle glow effect
  glow = branches * 0.3;

  // Combine colors
  vec3 color = branchColor * branches + glowColor * glow;

  // Add very subtle movement animation
  color *= 0.8 + sin(uTime * 0.2) * 0.1;

  // Mouse interaction creates subtle highlight
  float mouseDist = distance(st, uMouse);
  float mouseGlow = 1.0 - smoothstep(0.0, 0.3, mouseDist);
  color += glowColor * mouseGlow * 0.1;

  // Very low opacity for subtlety
  float alpha = (branches + glow * 0.5) * mix(0.08, 0.08, uTheme) * uOpacity;

  // Fade edges slightly
  vec2 center = st - 0.5;
  alpha *= 1.0 - dot(center, center) * 0.3;

  gl_FragColor = vec4(color, alpha);
}
`

function BackgroundThree({ isDarkMode }: BackgroundThreeProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const apiRef = useRef<{
    renderer: WebGLRenderer
    scene: Scene
    camera: OrthographicCamera
    material: ShaderMaterial
    mesh: Mesh
    ro: ResizeObserver
    stop: () => void
    renderOnce: () => void
    setThemeTarget: (v: number) => void
    setScrollTarget: (v: number) => void
  } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean }
      hardwareConcurrency?: number
    }
    const prefersLowPower =
      nav.connection?.saveData || (nav.hardwareConcurrency ?? 8) <= 4

    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(clampDpr(window.devicePixelRatio || 1))
    renderer.setSize(1, 1, false)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.opacity = '1'

    container.appendChild(renderer.domElement)

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uTheme: { value: isDarkMode ? 1 : 0 }, // 0 light → 1 dark
      uScroll: { value: getScrollProgress() }, // 0..1
      uMouse: { value: new Vector2(0.5, 0.5) }, // Mouse position 0..1
      uOpacity: { value: 1 },
    }

    const mouseTarget = new Vector2(0.5, 0.5)

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader: getFragmentShader(prefersLowPower),
      transparent: true,
      depthWrite: false,
      depthTest: false,
    })

    const mesh = new Mesh(new PlaneGeometry(2, 2), material)
    scene.add(mesh)

    let lastW = 0
    let lastH = 0
    let lastDpr = -1
    let currentRect: DOMRect | null = null

    const resize = () => {
      const rect = container.getBoundingClientRect()
      currentRect = rect
      
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      const dpr = clampDpr(window.devicePixelRatio || 1)

      if (w === lastW && h === lastH && dpr === lastDpr) return
      lastW = w
      lastH = h
      lastDpr = dpr

      renderer.setPixelRatio(dpr)
      renderer.setSize(w, h, false)
      uniforms.uResolution.value.set(w, h)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    let raf = 0
    let isRunning = false
    let lastFrameTime = 0
    const maxFps = prefersReducedMotion ? 0 : prefersLowPower ? 24 : 30
    const frameInterval = maxFps > 0 ? 1000 / maxFps : 0
    const clock = new Clock()

    let themeTarget = isDarkMode ? 1 : 0
    let scrollTarget = getScrollProgress()

    const setThemeTarget = (v: number) => {
      if (prefersReducedMotion) {
        uniforms.uTheme.value = v
        return
      }
      themeTarget = v
    }

    const setScrollTarget = (v: number) => {
      if (prefersReducedMotion) {
        uniforms.uScroll.value = v
        return
      }
      scrollTarget = v
    }

    const render = () => {
      renderer.render(scene, camera)
    }

    const tick = () => {
      if (!isRunning) return
      const now = performance.now()
      if (frameInterval > 0 && now - lastFrameTime < frameInterval) {
        raf = window.requestAnimationFrame(tick)
        return
      }
      lastFrameTime = now

      if (!prefersReducedMotion) {
        uniforms.uTime.value = clock.getElapsedTime()
      }

      uniforms.uTheme.value += (themeTarget - uniforms.uTheme.value) * 0.06
      uniforms.uScroll.value += (scrollTarget - uniforms.uScroll.value) * 0.08

      uniforms.uMouse.value.lerp(mouseTarget, 0.06)

      render()
      raf = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (prefersReducedMotion || isRunning) return
      isRunning = true
      lastFrameTime = 0
      raf = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      if (!isRunning) return
      isRunning = false
      window.cancelAnimationFrame(raf)
    }

    if (prefersReducedMotion) {
      uniforms.uTime.value = 0
      uniforms.uTheme.value = isDarkMode ? 1 : 0
      uniforms.uScroll.value = getScrollProgress()
      render()
    } else {
      start()
    }

    const renderOnce = () => render()

    apiRef.current = {
      renderer,
      scene,
      camera,
      material,
      mesh,
      ro,
      stop,
      renderOnce,
      setThemeTarget,
      setScrollTarget,
    }

    let scrollRaf: number | null = null
    const onScroll = () => {
      if (scrollRaf !== null) return
      scrollRaf = window.requestAnimationFrame(() => {
        apiRef.current?.setScrollTarget(getScrollProgress())
        if (prefersReducedMotion) apiRef.current?.renderOnce()
        scrollRaf = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let mouseRaf: number | null = null
    const onMouseMove = (e: MouseEvent) => {
      if (mouseRaf !== null) return
      
      mouseRaf = requestAnimationFrame(() => {
        if (!currentRect) {
           mouseRaf = null
           return 
        }
        
        const rect = currentRect
        const x = (e.clientX - rect.left) / rect.width
        const y = 1.0 - (e.clientY - rect.top) / rect.height
        mouseTarget.set(x, y)
        mouseRaf = null
      })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        start()
      } else {
        stop()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (scrollRaf !== null) window.cancelAnimationFrame(scrollRaf)
      if (mouseRaf !== null) window.cancelAnimationFrame(mouseRaf)
      stop()
      ro.disconnect()

      mesh.geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
      apiRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    apiRef.current?.setThemeTarget(isDarkMode ? 1 : 0)
    apiRef.current?.setScrollTarget(getScrollProgress())
  }, [isDarkMode])

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 z-[-20] pointer-events-none'
      aria-hidden='true'
    />
  )
}

export default memo(BackgroundThree)
