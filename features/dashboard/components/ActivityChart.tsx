'use client';

import { Button } from '@/shared/components/ui/button';
import { ButtonGroup } from '@/shared/components/ui/button-group';
import { designTokens } from '@/shared/constants/designTokens';
import { ChartColumnIcon } from 'lucide-react';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const ActivityChart = () => {
  const [chartView, setChartView] = useState<'WEEKLY' | 'MONTHLY'>('WEEKLY');

  return (
    <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border'>
      <div className='flex justify-between mb-8'>
        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2 font-semibold'>
            <ChartColumnIcon className='w-5 h-5 text-brand-500 stroke-2' /> 지원
            활동 분석
          </div>
          <p className='text-sm font-semibold text-slate-500'>
            최근 생성한 지원 관리 개수 현황 차트입니다.
          </p>
        </div>

        <ButtonGroup className='bg-slate-100 p-1.5 rounded-xl flex text-xs font-bold'>
          <Button
            variant='outline'
            onClick={() => setChartView('WEEKLY')}
            className={chartView === 'WEEKLY' ? 'bg-white shadow-sm' : ''}
          >
            주간
          </Button>
          <Button
            variant='outline'
            onClick={() => setChartView('MONTHLY')}
            className={chartView === 'MONTHLY' ? 'bg-white shadow-sm' : ''}
          >
            월간
          </Button>
        </ButtonGroup>
      </div>

      <div className='h-64'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={[
              {
                xAxisLabel: '12/12~',
                applicationsCount: 1,
              },
              {
                xAxisLabel: '12/19~',
                applicationsCount: 5,
              },
              {
                xAxisLabel: '12/26~',
                applicationsCount: 1,
              },
              {
                xAxisLabel: '지난주',
                applicationsCount: 10,
              },
              {
                xAxisLabel: '이번주',
                applicationsCount: 1,
              },
            ]}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              className='dark:stroke-slate-800 stroke-slate-100'
            />
            <XAxis
              dataKey='xAxisLabel'
              axisLine={false}
              tickLine={false}
              tick={{ fill: designTokens.colors.slate[400], fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: designTokens.colors.slate[400], fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: designTokens.colors.slate[50] }}
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }}
              itemStyle={{
                color: designTokens.colors.slate[700],
                fontWeight: 'bold',
                fontSize: '13px',
              }}
              labelStyle={{
                color: designTokens.colors.slate[400],
                fontSize: '12px',
                marginBottom: '4px',
              }}
            />
            <Bar
              dataKey='applicationsCount'
              fill={designTokens.colors.brand[500]}
              radius={[8, 8, 0, 0]}
              barSize={32}
              name='지원 관리 개수'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
