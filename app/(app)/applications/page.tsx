import ApplicationHeader from "@/features/applications/components/ApplicationHeader";
import ApplicationList from "@/features/applications/components/ApplicationList";

export default function ApplicationsPage() {
  return (
    <>
      <ApplicationHeader />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
        <ApplicationList />
      </div>
    </>
  );
}
