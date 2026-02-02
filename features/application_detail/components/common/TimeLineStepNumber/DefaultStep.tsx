import { BASE_CLASSES } from "./constants";

export default function DefaultStep({ number }: { number?: number }) {
  return (
    <div className={`${BASE_CLASSES} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400`}>
      {number && (
        <span className="text-xs md:text-sm font-bold">{number}</span>
      )}
    </div>
  );
}
