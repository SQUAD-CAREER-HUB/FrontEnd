import React from 'react';
import { InterviewQuestion } from '../types/interviewQuestion.types';
import { useRouter } from 'next/navigation';

interface QuestionListItemProps {
  question: InterviewQuestion;
  onDelete: (id: string) => void;
}

export const QuestionListItem: React.FC<QuestionListItemProps> = ({
  question,
  onDelete,
}) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleClick = () => {
    router.push(`/my-questions/${question.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('이 질문을 삭제하시겠습니까?')) {
      onDelete(question.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {question.title}
          </h3>
        </div>
        <button
          onClick={handleDelete}
          className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete question"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {question.category}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          {question.company}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {question.position}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500">
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {formatDate(question.createdAt)}
      </div>
    </div>
  );
};