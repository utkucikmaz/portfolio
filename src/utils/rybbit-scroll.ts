import { trackEvent } from './rybbit'

export const initScrollTracking = (): (() => void) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {}
  }

  let ticking = false
  let currentSection: string | null = null
  let observer: IntersectionObserver | null = null

  // --- semantic state ---
  const seenSections = new Set<string>()
  const firedMilestones = new Set<number>()
  const MILESTONES = [0.25, 0.5, 0.75, 1]

  // --- section observer ---
  const setupObserver = (): void => {
    try {
      const ids = [
        'hero',
        'craft',
        'journey',
        'projects',
        'personal',
        'contact',
      ]

      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el != null)

      if (!elements.length) return

      observer = new IntersectionObserver(
        (entries) => {
          let best: { id: string; ratio: number } | null = null

          for (const e of entries) {
            const el = e.target as HTMLElement
            const ratio = e.intersectionRatio ?? 0
            if (ratio > 0 && el.id) {
              if (!best || ratio > best.ratio + 0.15) {
                best = { id: el.id, ratio }
              }
            }
          }

          if (best && best.id !== currentSection) {
            currentSection = best.id

            if (!seenSections.has(best.id)) {
              seenSections.add(best.id)
              trackEvent('section_enter', {
                section: best.id,
                path: location.pathname,
              })
            }
          }
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: '-30% 0px -30% 0px',
        }
      )

      elements.forEach((el) => observer!.observe(el))
    } catch {
      // ignore
    }
  }

  setupObserver()

  const onScroll = (): void => {
    if (ticking || document.visibilityState !== 'visible') return
    ticking = true

    window.requestAnimationFrame(() => {
      try {
        const doc = document.documentElement
        const scrollTop = window.scrollY || doc.scrollTop || 0
        const maxScroll = doc.scrollHeight - doc.clientHeight
        if (maxScroll <= 0) return

        const depth = Math.max(0, Math.min(1, scrollTop / maxScroll))
        const ctx = {
          path: location.pathname,
          section: currentSection,
        }

        // --- milestones only ---
        for (const m of MILESTONES) {
          if (depth >= m && !firedMilestones.has(m)) {
            firedMilestones.add(m)
            trackEvent('scroll_milestone', {
              milestone: m,
              ...ctx,
            })
          }
        }
      } catch {
        // ignore analytics errors
      } finally {
        ticking = false
      }
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', onScroll)
    if (observer) {
      try {
        observer.disconnect()
      } catch {
        // ignore
      }
      observer = null
    }
  }
}
