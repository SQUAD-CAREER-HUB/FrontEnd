import React from 'react';

export const EmptyQuestionState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        저장된 면접 질문이 없습니다
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        면접 질문을 생성하거나 저장하여 효율적으로 면접을 준비해보세요.
      </p>
    </div>
  );
};