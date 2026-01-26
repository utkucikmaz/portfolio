import { analyticsConfig } from '../config/analytics'

const isProduction = (): boolean => {
  try {
    if (
      typeof (process as any) !== 'undefined' &&
      (process as any).env?.NODE_ENV
    ) {
      const env = (process as any).env.NODE_ENV
      if (env === 'production' || env === 'test' || env === 'staging') {
        return true
      }
      return env === 'production'
    }
  } catch {
    // fall through
  }
  if (typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname
    return !(host === 'localhost' || host === '127.0.0.1')
  }
  return true
}

const getSeed = (): string => {
  if (typeof sessionStorage !== 'undefined') {
    const key = 'rybbit_seed'
    let seed = sessionStorage.getItem(key)
    if (!seed) {
      seed = Math.random().toString(36).slice(2)
      sessionStorage.setItem(key, seed)
    }
    return seed
  }
  return Math.random().toString(36).slice(2)
}

const hashString = (str: string): number => {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0 // convert to 32bit integer
  }
  return Math.abs(h)
}

export const trackEvent = (
  action: string,
  payload?: Record<string, any>
): void => {
  try {
    if (!analyticsConfig.enabled) return
    if (!isProduction()) return
    const seed = getSeed()
    const sample = hashString(seed) / 2 ** 31
    const rate = analyticsConfig.sampleRate ?? 1
    if (rate < 1 && sample > rate) {
      return
    }

    if (typeof window !== 'undefined') {
      const rybbit = (window as any).rybbit
      if (rybbit && typeof rybbit.event === 'function') {
        rybbit.event(action, payload ?? {})
      }
    }
  } catch {
    // ignore analytics errors to avoid impacting UX
  }
}
