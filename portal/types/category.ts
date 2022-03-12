export interface ICategory {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  settings: Record<string, unknown>;
}

export interface ISubCategory {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  category: {
    data: ICategory;
  }; // ICategory;
  settings: Record<string, unknown>;
}
