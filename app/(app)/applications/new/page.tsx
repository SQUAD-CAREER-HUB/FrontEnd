import Header from "@/features/application/new/components/Header";
import NewApplicationForm from "@/features/application/new/components/NewApplicationForm";

export default function Page() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto p-4">
      <Header />
      <NewApplicationForm />
    </div>
  );
}
