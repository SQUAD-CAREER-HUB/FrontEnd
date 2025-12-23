import JobApplicationCard from "@/components/application/ApplicationCard";
import JobApplicationGrid from "@/components/application/ApplicationGrid";
import dummyApplications from "@/constants";

export default function Index() {
  return (
    <>
      <div>
        <div className="flex justify-between items-center px-4 py-4 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10 flex-shrink-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
              내 지원 현황
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">총 {dummyApplications.length}개의 기업에 지원했습니다.</p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
        <JobApplicationGrid>
          {
            dummyApplications.map((application) => {
              return (
                <JobApplicationCard key={application.id} data={application} />
              )
            })
          }
        </JobApplicationGrid>
      </div>
    </>
  )
}