export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SortOptions {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface FilterOptions {
  [key: string]: any;
}
