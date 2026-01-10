// JobApplicationGrid.tsx (React Component)
import React from 'react';

interface JobApplicationGridProps {
  children: React.ReactNode;
}

const JobApplicationGrid = ({ children } : JobApplicationGridProps) => {
  return (
    // 기본 1열 | md(768px 이상) 2열 | xl(1280px 이상) 3열
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {children}
    </div>
  );
};

export default JobApplicationGrid;