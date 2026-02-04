import { BASE_CLASSES } from "./constants";

export default function ActiveStep({ number }: { number?: number }) {
  return (
    <div className={`${BASE_CLASSES} bg-white dark:bg-slate-900 border-brand-500 text-brand-600 ring-4 ring-brand-50 dark:ring-brand-900/30`}>
      {number && (
        <span className="text-xs md:text-sm font-bold">{number}</span>
      )}
    </div>
  );
}
