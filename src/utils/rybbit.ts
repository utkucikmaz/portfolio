export const trackEvent = (
  action: string,
  payload?: Record<string, any>
): void => {
  try {
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
