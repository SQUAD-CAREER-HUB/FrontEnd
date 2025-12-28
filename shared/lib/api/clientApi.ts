export const clientApi = {
  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const bffUrl = `/api/bff${path.startsWith('/') ? path : `/${path}`}`;

    const response = await fetch(bffUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '클라이언트 요청 에러');
    }

    return response.json();
  },

  get<T>(path: string, options?: RequestInit) {
    return this.request<T>(path, { ...options, method: 'GET' });
  },

  post<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  // put, delete 등 필요한 메서드 추가
};
