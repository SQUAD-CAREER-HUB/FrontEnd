import { InterviewQuestion, InterviewQuestionsResponse, QuestionFilters } from '../types/interviewQuestion.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const interviewQuestionsApi = {
  // Get all questions
  getQuestions: async (filters?: QuestionFilters): Promise<InterviewQuestionsResponse> => {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.company) params.append('company', filters.company);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await fetch(`${API_BASE_URL}/interview-questions?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch interview questions');
    }
    
    return response.json();
  },

  // Get single question
  getQuestionById: async (id: string): Promise<InterviewQuestion> => {
    const response = await fetch(`${API_BASE_URL}/interview-questions/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch question');
    }
    
    return response.json();
  },

  // Delete question
  deleteQuestion: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/interview-questions/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete question');
    }
  },
};