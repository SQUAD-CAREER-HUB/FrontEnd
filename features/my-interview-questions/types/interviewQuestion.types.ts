export interface InterviewQuestion {
    id: string;
    title: string;
    company: string;
    position: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    content?: string;
  }
  
  export interface InterviewQuestionsResponse {
    data: InterviewQuestion[];
    total: number;
    page: number;
    pageSize: number;
  }
  
  export interface QuestionFilters {
    search?: string;
    category?: string;
    company?: string;
    sortBy?: 'createdAt' | 'company' | 'position';
    sortOrder?: 'asc' | 'desc';
  }