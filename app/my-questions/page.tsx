'use client';

import React, { useState } from 'react';
import { useInterviewQuestions, useDeleteQuestion } from '@/features/my-interview-questions/hooks/useInterviewQuestions';
import { QuestionListItem } from '@/features/my-interview-questions/components/QuestionListItem';
import { QuestionFilter } from '@/features/my-interview-questions/components/QuestionFilter';
import { EmptyQuestionState } from '@/features/my-interview-questions/components/EmptyQuestionState';

export default function MyQuestionsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data, isLoading, error } = useInterviewQuestions({ search, category });
  const deleteQuestion = useDeleteQuestion();

  const handleDelete = (id: string) => {
    deleteQuestion.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          질문을 불러오는데 실패했습니다. 다시 시도해주세요.
        </div>
      </div>
    );
  }

  const questions = data?.data || [];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">나의 면접 질문</h1>
        <p className="text-gray-600">
          총 {data?.total || 0}개의 질문이 저장되어 있습니다.
        </p>
      </div>

      <QuestionFilter
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        searchValue={search}
        categoryValue={category}
      />

      {questions.length === 0 ? (
        <EmptyQuestionState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((question) => (
            <QuestionListItem
              key={question.id}
              question={question}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}