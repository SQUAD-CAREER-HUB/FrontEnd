interface JobTitleProps {
  companyName: string;
  position: string;
}

export default function JobTitle({ companyName, position }: JobTitleProps) {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
        <span>{companyName}</span>
      </h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
        {position}
      </p>
    </div>
  );
}
