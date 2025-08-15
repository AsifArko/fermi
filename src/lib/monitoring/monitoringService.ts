export class MonitoringService {
  private static instance: MonitoringService;

  // Simple metrics storage (in-memory for Edge Runtime compatibility)
  private metrics = {
    httpRequestsTotal: 0,
    httpRequestDuration: [] as number[],
    activeConnections: 0,
    pageViewsTotal: 0,
    userEventsTotal: 0,
    errorRate: 0,
  };

  private constructor() {
    // Start monitoring
    this.startSystemMonitoring();
  }

  public static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private startSystemMonitoring(): void {
    // Simple interval-based monitoring (Edge Runtime compatible)
    if (typeof setInterval !== 'undefined') {
      setInterval(() => {
        // Keep track of basic metrics
        this.metrics.activeConnections = Math.max(
          0,
          this.metrics.activeConnections
        );
      }, 30000);
    }
  }

  public recordHttpRequest(
    method: string,
    route: string,
    statusCode: number,
    duration: number
  ): void {
    this.metrics.httpRequestsTotal++;
    this.metrics.httpRequestDuration.push(duration);

    // Simple logging for Edge Runtime (development only)
    if (
      typeof console !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      // eslint-disable-next-line no-console
      console.log('HTTP Request', {
        method,
        route,
        statusCode,
        duration,
        timestamp: new Date().toISOString(),
      });
    }
  }

  public recordPageView(
    url: string,
    deviceType: string,
    browser: string
  ): void {
    this.metrics.pageViewsTotal++;

    // Simple logging for Edge Runtime (development only)
    if (
      typeof console !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      // eslint-disable-next-line no-console
      console.log('Page View', {
        url,
        deviceType,
        browser,
        timestamp: new Date().toISOString(),
      });
    }
  }

  public recordUserEvent(eventType: string, eventName: string): void {
    this.metrics.userEventsTotal++;

    // Simple logging for Edge Runtime (development only)
    if (
      typeof console !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      // eslint-disable-next-line no-console
      console.log('User Event', {
        eventType,
        eventName,
        timestamp: new Date().toISOString(),
      });
    }
  }

  public recordError(
    errorType: string,
    severity: string,
    message: string
  ): void {
    this.metrics.errorRate++;

    // Simple logging for Edge Runtime (development only)
    if (
      typeof console !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      // eslint-disable-next-line no-console
      console.error('Error Recorded', {
        errorType,
        severity,
        message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  public getMetrics(): string {
    // Return simple metrics in a format similar to Prometheus
    const avgDuration =
      this.metrics.httpRequestDuration.length > 0
        ? this.metrics.httpRequestDuration.reduce((a, b) => a + b, 0) /
          this.metrics.httpRequestDuration.length
        : 0;

    return `# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total ${this.metrics.httpRequestsTotal}

# HELP http_request_duration_seconds HTTP request duration in seconds
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_sum ${this.metrics.httpRequestDuration.reduce((a, b) => a + b, 0)}
http_request_duration_seconds_count ${this.metrics.httpRequestDuration.length}
http_request_duration_seconds_avg ${avgDuration}

# HELP active_connections Number of active connections
# TYPE active_connections gauge
active_connections ${this.metrics.activeConnections}

# HELP page_views_total Total number of page views
# TYPE page_views_total counter
page_views_total ${this.metrics.pageViewsTotal}

# HELP user_events_total Total number of user events
# TYPE user_events_total counter
user_events_total ${this.metrics.userEventsTotal}

# HELP errors_total Total number of errors
# TYPE errors_total counter
errors_total ${this.metrics.errorRate}`;
  }

  public getMetricsObject() {
    return this.metrics;
  }

  // Getters for individual metrics
  public get httpRequestsTotal() {
    return { get: () => this.metrics.httpRequestsTotal };
  }

  public get httpRequestDuration() {
    return { get: () => this.metrics.httpRequestDuration };
  }

  public get activeConnections() {
    return this.metrics.activeConnections;
  }

  public set activeConnections(value: number) {
    this.metrics.activeConnections = value;
  }

  public get memoryUsage() {
    return { get: () => ({ rss: 0, heapUsed: 0, heapTotal: 0 }) };
  }

  public get cpuUsage() {
    return { get: () => 0 };
  }

  public get pageViewsTotal() {
    return { get: () => this.metrics.pageViewsTotal };
  }

  public get userEventsTotal() {
    return { get: () => this.metrics.userEventsTotal };
  }

  public get errorRate() {
    return { get: () => this.metrics.errorRate };
  }
}
