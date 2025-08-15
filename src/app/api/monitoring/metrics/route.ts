import { NextResponse } from 'next/server';

import { MonitoringService } from '@/lib/monitoring/monitoringService';

export async function GET() {
  try {
    const monitoring = MonitoringService.getInstance();
    const metrics = monitoring.getMetrics();

    return new NextResponse(metrics, {
      headers: {
        'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
      },
    });
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error fetching metrics:', error);
    }
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}
