import api from './api';

export interface TryOnRequest {
  userImageUrl: string;
  productImageUrl: string;
}

export interface TryOnResponse {
  resultImageUrl: string;
  success: boolean;
  message?: string;
}

export const aiTryonService = {
  /**
   * Perform virtual try-on with AI
   */
  virtualTryOn: async (data: TryOnRequest): Promise<TryOnResponse> => {
    const response = await api.post<TryOnResponse>('/ai-tryon', data);
    return response.data;
  },

  /**
   * Check AI service health
   */
  checkHealth: async (): Promise<{ status: string; message?: string }> => {
    const response = await api.get('/ai-tryon/health');
    return response.data;
  },
};
