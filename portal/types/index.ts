export type SideBarItems =
  | "home"
  | "search"
  | "category"
  | "sub-category"
  | "staff";

export type SearchOptions = "all" | "category" | "sub-category" | "staff";

export interface Pagination {
  page?: number;
  pageSize?: number;
  pageCount?: number;
  total?: number;
  start?: number;
  limit?: number;
}

export interface IMeta {
  pagination: Pagination;
}

export interface IErrors {
  status: number;
  name: string;
  message: string;
  details: {
    errors: Array<{
      path: string[];
      message: string;
      name: string;
    }>;
  };
}

export interface IApiResponse<T> {
  data: {
    data: Array<T>;
    meta: IMeta;
    error: IErrors;
  };
  status: number;
}

export type { ICategory, ISubCategory } from "./category";
