export interface Category {
  code: string;
  createdAt: string;
  deleted: boolean;
  id: string;
  name: string;
  updatedAt: string;
}

export interface SubCategory {
  code: string;
  id: string;
  name: string;
  category: string;
}
