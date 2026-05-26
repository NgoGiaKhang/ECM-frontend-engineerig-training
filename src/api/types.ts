export type ApiResponse<T> = {
  data: T;
};
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
};
export type ApiErrorResponse = {
  status: number;
  message: string;
  code: string;
};
