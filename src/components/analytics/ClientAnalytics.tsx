'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useCallback } from 'react';

interface ClientAnalyticsProps {
  userId?: string;
}

// Extend Window interface for global tracking
declare global {
  interface Window {
    trackEvent?: (
      eventType: string,
      eventName: string,
      metadata?: Record<string, unknown>
    ) => Promise<void>;
  }
}

export function ClientAnalytics({ userId }: ClientAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const trackPageView = useCallback(async () => {
    try {
      const startTime = performance.now();

      // Wait for page to load
      setTimeout(async () => {
        const loadTime = performance.now() - startTime;

        // Get performance metrics
        const performanceMetrics = await getPerformanceMetrics();

        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageView: {
              url: pathname,
              referrer: document.referrer,
              pageLoadTime: Math.round(loadTime),
              deviceType: getDeviceType(),
              browser: getBrowser(),
            },
            performance: performanceMetrics,
            metadata: {
              userId,
              searchParams: Object.fromEntries(searchParams.entries()),
            },
          }),
        });
      }, 100);
    } catch (error) {
      // Silently handle errors in production
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Failed to track page view:', error);
      }
    }
  }, [pathname, searchParams, userId]);

  const trackEvent = useCallback(
    async (
      eventType: string,
      eventName: string,
      metadata?: Record<string, unknown>
    ) => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType,
            eventName,
            url: pathname,
            metadata: {
              ...metadata,
              userId,
            },
          }),
        });
      } catch (error) {
        // Silently handle errors in production
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('Failed to track event:', error);
        }
      }
    },
    [pathname, userId]
  );

  // Track page view on route change
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  // Expose tracking function globally for use in other components
  useEffect(() => {
    window.trackEvent = trackEvent;
    return () => {
      delete window.trackEvent;
    };
  }, [trackEvent]);

  return null; // This component doesn't render anything
}

// Helper functions
function getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  const userAgent = navigator.userAgent;
  const mobileRegex =
    /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i;

  if (tabletRegex.test(userAgent)) return 'tablet';
  if (mobileRegex.test(userAgent)) return 'mobile';
  return 'desktop';
}

function getBrowser(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
}

async function getPerformanceMetrics() {
  try {
    // Wait for performance metrics to be available
    await new Promise(resolve => setTimeout(resolve, 1000));

    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    // Get Core Web Vitals
    const fcp =
      paint.find(entry => entry.name === 'first-contentful-paint')?.startTime ||
      0;
    const lcp = await getLargestContentfulPaint();
    const cls = await getCumulativeLayoutShift();
    const fid = await getFirstInputDelay();

    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      firstContentfulPaint: fcp,
      largestContentfulPaint: lcp,
      cumulativeLayoutShift: cls,
      firstInputDelay: fid,
    };
  } catch {
    return {
      loadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0,
    };
  }
}

async function getLargestContentfulPaint(): Promise<number> {
  try {
    if ('PerformanceObserver' in window) {
      return new Promise(resolve => {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });

        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    }
    return 0;
  } catch {
    return 0;
  }
}

async function getCumulativeLayoutShift(): Promise<number> {
  try {
    if ('PerformanceObserver' in window) {
      return new Promise(resolve => {
        let cls = 0;
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (
              !(entry as PerformanceEntry & { hadRecentInput?: boolean })
                .hadRecentInput
            ) {
              cls +=
                (entry as PerformanceEntry & { value?: number }).value || 0;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });

        // Fallback timeout
        setTimeout(() => resolve(cls), 5000);
      });
    }
    return 0;
  } catch {
    return 0;
  }
}

async function getFirstInputDelay(): Promise<number> {
  try {
    if ('PerformanceObserver' in window) {
      return new Promise(resolve => {
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            const inputEntry = entry as PerformanceEntry & {
              processingStart?: number;
              startTime?: number;
            };
            resolve(
              (inputEntry.processingStart || 0) - (inputEntry.startTime || 0)
            );
            break;
          }
        });
        observer.observe({ entryTypes: ['first-input'] });

        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    }
    return 0;
  } catch {
    return 0;
  }
}

// Export tracking function for use in other components
export const trackEvent = (
  eventType: string,
  eventName: string,
  metadata?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent(eventType, eventName, metadata);
  }
};
