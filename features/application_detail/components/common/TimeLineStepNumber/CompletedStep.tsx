import { Check } from "lucide-react";
import { BASE_CLASSES } from "./constants";

export default function CompletedStep() {
  return (
    <div className={`${BASE_CLASSES} bg-green-500 border-green-500 text-white`}>
      <Check className="w-5 h-5" />
    </div>
  );
}
