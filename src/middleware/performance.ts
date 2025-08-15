import { NextRequest } from 'next/server';

import { MonitoringService } from '@/lib/monitoring/monitoringService';

export function performanceMiddleware(request: NextRequest) {
  const monitoring = MonitoringService.getInstance();

  // Record request start
  monitoring.activeConnections = monitoring.activeConnections + 1;

  // For now, just record basic metrics without response handling
  // TODO: Implement proper response monitoring
  const method = request.method;
  const route = request.nextUrl.pathname;

  // Record request immediately
  monitoring.recordHttpRequest(method, route, 200, 0);

  // Decrease active connections
  monitoring.activeConnections = Math.max(0, monitoring.activeConnections - 1);
}
