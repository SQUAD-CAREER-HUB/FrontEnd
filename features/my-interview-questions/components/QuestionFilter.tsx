import React from 'react';

interface QuestionFilterProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  searchValue: string;
  categoryValue: string;
}

const categories = ['전체', '기술', '인성', '경험', '프로젝트'];

export const QuestionFilter: React.FC<QuestionFilterProps> = ({
  onSearchChange,
  onCategoryChange,
  searchValue,
  categoryValue,
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="질문 또는 회사명으로 검색..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = categoryValue === (category === '전체' ? '' : category);
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category === '전체' ? '' : category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};