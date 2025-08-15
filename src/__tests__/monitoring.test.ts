import { AnalyticsService } from '@/lib/monitoring/analyticsService';
import { MonitoringService } from '@/lib/monitoring/monitoringService';

describe('Monitoring System', () => {
  describe('MonitoringService', () => {
    it('should create a singleton instance', () => {
      const instance1 = MonitoringService.getInstance();
      const instance2 = MonitoringService.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should have required metrics', () => {
      const monitoring = MonitoringService.getInstance();
      expect(monitoring.httpRequestsTotal).toBeDefined();
      expect(monitoring.httpRequestDuration).toBeDefined();
      expect(monitoring.activeConnections).toBeDefined();
      expect(monitoring.memoryUsage).toBeDefined();
      expect(monitoring.cpuUsage).toBeDefined();
      expect(monitoring.pageViewsTotal).toBeDefined();
      expect(monitoring.userEventsTotal).toBeDefined();
      expect(monitoring.errorRate).toBeDefined();
    });

    it('should have logger configured', () => {
      const monitoring = MonitoringService.getInstance();
      expect(monitoring.logger).toBeDefined();
      expect(typeof monitoring.logger.info).toBe('function');
      expect(typeof monitoring.logger.error).toBe('function');
    });
  });

  describe('AnalyticsService', () => {
    it('should create a singleton instance', () => {
      const instance1 = AnalyticsService.getInstance();
      const instance2 = AnalyticsService.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should have tracking methods', () => {
      const analytics = AnalyticsService.getInstance();
      expect(typeof analytics.trackPageView).toBe('function');
      expect(typeof analytics.trackUserEvent).toBe('function');
      expect(typeof analytics.trackPerformance).toBe('function');
      expect(typeof analytics.trackError).toBe('function');
      expect(typeof analytics.getAnalyticsData).toBe('function');
    });
  });

  describe('Device Detection', () => {
    it('should detect device types correctly', () => {
      const analytics = AnalyticsService.getInstance();

      // Test desktop detection
      const desktopUA =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
      expect(analytics['getDeviceType'](desktopUA)).toBe('desktop');

      // Test mobile detection
      const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
      expect(analytics['getDeviceType'](mobileUA)).toBe('mobile');

      // Test tablet detection
      const tabletUA = 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)';
      expect(analytics['getDeviceType'](tabletUA)).toBe('tablet');
    });

    it('should detect browsers correctly', () => {
      const analytics = AnalyticsService.getInstance();

      expect(analytics['getBrowser']('Chrome/91.0.4472.124')).toBe('Chrome');
      expect(analytics['getBrowser']('Firefox/89.0')).toBe('Firefox');
      expect(analytics['getBrowser']('Safari/14.1.1')).toBe('Safari');
      expect(analytics['getBrowser']('Edge/91.0.864.59')).toBe('Edge');
      expect(analytics['getBrowser']('Opera/77.0.4054.254')).toBe('Opera');
      expect(analytics['getBrowser']('Unknown Browser')).toBe('Unknown');
    });

    it('should detect operating systems correctly', () => {
      const analytics = AnalyticsService.getInstance();

      expect(analytics['getOS']('Windows NT 10.0')).toBe('Windows');
      expect(analytics['getOS']('Macintosh; Intel Mac OS X 10_15_7')).toBe(
        'macOS'
      );
      expect(analytics['getOS']('X11; Linux x86_64')).toBe('Linux');
      expect(analytics['getOS']('Android 11')).toBe('Android');
      expect(analytics['getOS']('iPhone; CPU iPhone OS 14_0')).toBe('iOS');
      expect(analytics['getOS']('Unknown OS')).toBe('Unknown');
    });
  });

  describe('ID Generation', () => {
    it('should generate unique IDs with correct prefixes', () => {
      const analytics = AnalyticsService.getInstance();

      const pageViewId = analytics['generateId']('pv');
      const eventId = analytics['generateId']('evt');
      const perfId = analytics['generateId']('perf');
      const errorId = analytics['generateId']('err');

      expect(pageViewId).toMatch(/^pv_\d+_[a-z0-9]{9}$/);
      expect(eventId).toMatch(/^evt_\d+_[a-z0-9]{9}$/);
      expect(perfId).toMatch(/^perf_\d+_[a-z0-9]{9}$/);
      expect(errorId).toMatch(/^err_\d+_[a-z0-9]{9}$/);

      // IDs should be unique
      expect(pageViewId).not.toBe(eventId);
      expect(perfId).not.toBe(errorId);
    });
  });
});
