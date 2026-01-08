'use client'
import JobDetailCard from "@/features/application_detail/components/JobDetailCard";
import JobDetailHeader from "@/features/application_detail/components/JobDetailHeader";

export default function JobDetailPage() {
  return (
    <div className='flex flex-1 flex-col p-4'>
      <JobDetailHeader />
      <JobDetailCard />
    </div>
  );
}