export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  statusCode: number;
  timestamp: string;
}
