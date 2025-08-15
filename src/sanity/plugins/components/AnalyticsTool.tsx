import React from 'react';

import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

export function AnalyticsTool() {
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>
          Analytics Dashboard
        </h1>
        <p className='text-gray-600 mt-2'>
          Real-time monitoring and analytics for your application
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
