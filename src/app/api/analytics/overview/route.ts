import { NextResponse } from 'next/server';

import { analyticsService } from '@/lib/monitoring/analyticsService';
import { MonitoringService } from '@/lib/monitoring/monitoringService';

export async function GET() {
  try {
    const monitoring = MonitoringService.getInstance();
    const analytics = await analyticsService.getAnalyticsData();

    const overview = {
      timestamp: new Date().toISOString(),
      metrics: {
        httpRequests: await monitoring.httpRequestsTotal.get(),
        requestDuration: await monitoring.httpRequestDuration.get(),
        activeConnections: monitoring.activeConnections,
        memoryUsage: await monitoring.memoryUsage.get(),
        cpuUsage: await monitoring.cpuUsage.get(),
        pageViews: await monitoring.pageViewsTotal.get(),
        userEvents: await monitoring.userEventsTotal.get(),
        errors: await monitoring.errorRate.get(),
      },
      analytics: {
        totalUsers: analytics.totalUsers,
        activeUsers: analytics.activeUsers,
        pageViews: analytics.pageViews,
        conversionRate: analytics.conversionRate,
        topPages: analytics.topPages,
        userEngagement: analytics.userEngagement,
      },
    };

    return NextResponse.json(overview);
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching analytics data:', error);
    }
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
