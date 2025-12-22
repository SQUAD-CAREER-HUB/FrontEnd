'use client'
import JobDetailCard from "@/components/application_detail/JobDetailCard";
import JobDetailHeader from "@/components/application_detail/JobDetailHeader";

export default function JobDetailPage() {
  return (
    <div className='flex flex-1 flex-col p-4'>
      <JobDetailHeader />
      <JobDetailCard />
    </div>
  );
}