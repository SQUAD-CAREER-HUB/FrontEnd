import { X } from "lucide-react";
import { BASE_CLASSES } from "./constants";

export default function FailedStep() {
  return (
    <div className={`${BASE_CLASSES} bg-red-500 border-red-500 text-white`}>
      <X className="w-5 h-5" />
    </div>
  );
}
