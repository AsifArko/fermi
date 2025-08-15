import { groq } from 'next-sanity';

import { client } from '@/sanity/lib/client';

export interface PageView {
  id: string;
  timestamp: Date;
  url: string;
  referrer?: string;
  userAgent: string;
  ipAddress: string;
  sessionId: string;
  userId?: string;
  pageLoadTime: number;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  country?: string;
  city?: string;
  isp?: string;
}

export interface UserEvent {
  id: string;
  timestamp: Date;
  eventType:
    | 'page_view'
    | 'button_click'
    | 'form_submit'
    | 'download'
    | 'purchase'
    | 'error';
  eventName: string;
  sessionId: string;
  userId?: string;
  url: string;
  metadata?: Record<string, unknown>;
  ipAddress: string;
}

export interface PerformanceMetric {
  id: string;
  timestamp: Date;
  url: string;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  sessionId: string;
  userId?: string;
}

export interface ErrorLog {
  id: string;
  timestamp: Date;
  errorType: 'client' | 'server' | 'database' | 'external';
  message: string;
  stack?: string;
  url: string;
  sessionId?: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  pageViews: number;
  conversionRate: number;
  topPages: Array<{ path: string; views: number }>;
  userEngagement: {
    averageSessionDuration: number;
    bounceRate: number;
    pagesPerSession: number;
  };
}

export class AnalyticsService {
  private static instance: AnalyticsService;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
    const mobileRegex =
      /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const tabletRegex = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i;

    if (tabletRegex.test(userAgent)) return 'tablet';
    if (mobileRegex.test(userAgent)) return 'mobile';
    return 'desktop';
  }

  private getBrowser(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Unknown';
  }

  private getOS(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private async getGeolocation(
    ipAddress: string
  ): Promise<{ country?: string; city?: string; isp?: string }> {
    try {
      // Use a free IP geolocation service
      const response = await fetch(
        `http://ip-api.com/json/${ipAddress}?fields=country,city,isp`
      );
      const data = await response.json();

      return {
        country: data.country,
        city: data.city,
        isp: data.isp,
      };
    } catch (error) {
      // Log warning in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Failed to get geolocation data:', error);
      }
      return {};
    }
  }

  async trackPageView(data: {
    url: string;
    referrer?: string;
    userAgent: string;
    ipAddress: string;
    userId?: string;
    pageLoadTime: number;
    sessionId: string;
  }): Promise<void> {
    try {
      const geolocation = await this.getGeolocation(data.ipAddress);

      const pageView: PageView = {
        id: this.generateId('pv'),
        timestamp: new Date(),
        url: data.url,
        referrer: data.referrer,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        sessionId: data.sessionId,
        userId: data.userId,
        pageLoadTime: data.pageLoadTime,
        deviceType: this.getDeviceType(data.userAgent),
        browser: this.getBrowser(data.userAgent),
        os: this.getOS(data.userAgent),
        ...geolocation,
      };

      // Store in Sanity
      await client.create({
        _type: 'pageView',
        ...pageView,
      });
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to track page view:', error);
      }
    }
  }

  async trackUserEvent(data: {
    eventType: UserEvent['eventType'];
    eventName: string;
    url: string;
    userId?: string;
    ipAddress: string;
    sessionId: string;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    try {
      const userEvent: UserEvent = {
        id: this.generateId('evt'),
        timestamp: new Date(),
        eventType: data.eventType,
        eventName: data.eventName,
        sessionId: data.sessionId,
        userId: data.userId,
        url: data.url,
        metadata: data.metadata,
        ipAddress: data.ipAddress,
      };

      // Store in Sanity
      await client.create({
        _type: 'userEvent',
        ...userEvent,
      });
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to track user event:', error);
      }
    }
  }

  async trackPerformance(data: {
    url: string;
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
    userId?: string;
    sessionId: string;
  }): Promise<void> {
    try {
      const performanceMetric: PerformanceMetric = {
        id: this.generateId('perf'),
        timestamp: new Date(),
        url: data.url,
        loadTime: data.loadTime,
        firstContentfulPaint: data.firstContentfulPaint,
        largestContentfulPaint: data.largestContentfulPaint,
        cumulativeLayoutShift: data.cumulativeLayoutShift,
        firstInputDelay: data.firstInputDelay,
        sessionId: data.sessionId,
        userId: data.userId,
      };

      // Store in Sanity
      await client.create({
        _type: 'performanceMetric',
        ...performanceMetric,
      });
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to track performance metric:', error);
      }
    }
  }

  async trackError(data: {
    errorType: ErrorLog['errorType'];
    message: string;
    stack?: string;
    url: string;
    sessionId?: string;
    userId?: string;
    ipAddress: string;
    userAgent: string;
    severity: ErrorLog['severity'];
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    try {
      const errorLog: ErrorLog = {
        id: this.generateId('err'),
        timestamp: new Date(),
        errorType: data.errorType,
        message: data.message,
        stack: data.stack,
        url: data.url,
        sessionId: data.sessionId,
        userId: data.userId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        severity: data.severity,
        resolved: false,
        metadata: data.metadata,
      };

      // Store in Sanity
      await client.create({
        _type: 'errorLog',
        ...errorLog,
      });
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to track error:', error);
      }
    }
  }

  async getAnalyticsData(): Promise<AnalyticsData> {
    try {
      // Fetch data from Sanity
      const [userStats, pageStats, engagementStats] = await Promise.all([
        this.getUserStats(),
        this.getPageStats(),
        this.getEngagementStats(),
      ]);

      return {
        totalUsers: userStats.totalUsers,
        activeUsers: userStats.activeUsers,
        pageViews: pageStats.totalPageViews,
        conversionRate: this.calculateConversionRate(userStats),
        topPages: pageStats.topPages,
        userEngagement: engagementStats,
      };
    } catch (error) {
      // Log error in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error fetching analytics data:', error);
      }
      return this.getDefaultAnalyticsData();
    }
  }

  private async getUserStats() {
    try {
      const query = groq`
        {
          "totalUsers": count(*[_type == "student"]),
          "activeUsers": count(*[_type == "student" && defined(lastActive) && lastActive > now() - 30*24*60*60*1000])
        }
      `;
      return await client.fetch(query);
    } catch (error) {
      // Log warning in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Failed to get user stats:', error);
      }
      return { totalUsers: 0, activeUsers: 0 };
    }
  }

  private async getPageStats() {
    try {
      const query = groq`
        {
          "totalPageViews": count(*[_type == "pageView"]),
          "topPages": *[_type == "pageView"] | order(views desc)[0...10] {
            path,
            views
          }
        }
      `;
      return await client.fetch(query);
    } catch (error) {
      // Log warning in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Failed to get page stats:', error);
      }
      return { totalPageViews: 0, topPages: [] };
    }
  }

  private async getEngagementStats() {
    try {
      const userStats = await this.getUserStats();
      const pageStats = await this.getPageStats();

      // Calculate engagement metrics
      const totalSessions = userStats.totalUsers || 1;
      const totalPageViews = pageStats.totalPageViews || 0;

      return {
        averageSessionDuration: (userStats.activeUsers || 0) / totalSessions,
        bounceRate: (userStats.activeUsers || 0) / totalSessions,
        pagesPerSession: totalPageViews / totalSessions,
      };
    } catch (error) {
      // Log warning in development only
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to get engagement stats:', error);
      }
      return {
        averageSessionDuration: 0,
        bounceRate: 0,
        pagesPerSession: 0,
      };
    }
  }

  private calculateConversionRate(userStats: {
    totalUsers: number;
    activeUsers: number;
  }): number {
    if (!userStats.totalUsers || userStats.totalUsers === 0) return 0;
    return (userStats.activeUsers / userStats.totalUsers) * 100;
  }

  private getDefaultAnalyticsData(): AnalyticsData {
    return {
      totalUsers: 0,
      activeUsers: 0,
      pageViews: 0,
      conversionRate: 0,
      topPages: [],
      userEngagement: {
        averageSessionDuration: 0,
        bounceRate: 0,
        pagesPerSession: 0,
      },
    };
  }
}

export const analyticsService = AnalyticsService.getInstance();
