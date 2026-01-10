import ApplicationHeader from "@/features/applications/components/ApplicationHeader";
import ApplicationList from "@/features/applications/components/ApplicationList";
import dummyApplications from "@/constants";

export default function ApplicationsPage() {
  // TODO: API 연동 시 여기서 데이터 fetch
  // const { data: applications, isLoading, error } = useApplications();
  const applications = dummyApplications;

  return (
    <>
      <ApplicationHeader totalCount={applications.length} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
        <ApplicationList
          applications={applications}
          // isLoading={isLoading}
          // error={error}
        />
      </div>
    </>
  );
}
