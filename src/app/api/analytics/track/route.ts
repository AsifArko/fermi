import { NextRequest, NextResponse } from 'next/server';

import { analyticsService } from '@/lib/monitoring/analyticsService';
import { MonitoringService } from '@/lib/monitoring/monitoringService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, eventName, url, metadata, performance, pageView } = body;

    // Get client IP address
    const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Generate session ID (in a real app, this would come from client)
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Track page view if provided
    if (pageView) {
      await analyticsService.trackPageView({
        url: pageView.url,
        referrer: pageView.referrer,
        userAgent,
        ipAddress,
        userId: pageView.userId,
        pageLoadTime: pageView.pageLoadTime || 0,
        sessionId,
      });

      // Also record in monitoring service
      const monitoring = MonitoringService.getInstance();
      monitoring.recordPageView(
        pageView.url,
        pageView.deviceType || 'desktop',
        pageView.browser || 'unknown'
      );
    }

    // Track user event if provided
    if (eventType && eventName) {
      await analyticsService.trackUserEvent({
        eventType,
        eventName,
        url,
        userId: metadata?.userId,
        ipAddress,
        sessionId,
        metadata,
      });

      // Also record in monitoring service
      const monitoring = MonitoringService.getInstance();
      monitoring.recordUserEvent(eventType, eventName);
    }

    // Track performance metrics if provided
    if (performance) {
      await analyticsService.trackPerformance({
        url,
        loadTime: performance.loadTime || 0,
        firstContentfulPaint: performance.firstContentfulPaint || 0,
        largestContentfulPaint: performance.largestContentfulPaint || 0,
        cumulativeLayoutShift: performance.cumulativeLayoutShift || 0,
        firstInputDelay: performance.firstInputDelay || 0,
        userId: metadata?.userId,
        sessionId,
      });
    }

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error tracking analytics:', error);
    }
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    );
  }
}
