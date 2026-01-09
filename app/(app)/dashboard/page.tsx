import { ActivityChart } from '@/features/dashboard/components/ActivityChart';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { RecentApplications } from '@/features/dashboard/components/RecentApplications';
import { StatusPieChart } from '@/features/dashboard/components/StatusPieChart';
import { UpcomingSchedules } from '@/features/dashboard/components/UpcomingSchedules';

export default function DashboardPage() {
  return (
    <div className='p-4 flex flex-col gap-y-4'>
      <DashboardHeader />
      <DashboardStats />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-8'>
          <RecentApplications />
          {/* 지원 활동 분석 차트 */}
          <ActivityChart />
        </div>

        <div className='space-y-8'>
          <UpcomingSchedules />
          <StatusPieChart />
        </div>
      </div>
    </div>
  );
}
