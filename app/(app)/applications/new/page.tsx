import Header from "@/features/application/new/components/Header";
import Stepper from "@/features/application/new/components/Stepper";
import URLForm from "@/features/application/new/components/URLForm";

export default function Page() {
  return (<div className="animate-fade-in max-w-4xl mx-auto p-4">
    <Header />
    <Stepper />
    <URLForm />
  </div>)
}