export type AnalyticsConfig = {
  enabled?: boolean
  sampleRate?: number
  maxEventsPerSession?: number
}

export const analyticsConfig: AnalyticsConfig = {
  enabled: true,
  sampleRate:
    typeof window !== 'undefined' &&
    (window as any).__ANALYTICS_SAMPLE_RATE__ != null
      ? Number((window as any).__ANALYTICS_SAMPLE_RATE__)
      : 0.2,
  maxEventsPerSession: 1000,
}
