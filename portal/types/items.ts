import { ICategory, ISubCategory } from "./category";

export interface Items {
  id: number;
  name: string;
  description: string;
  quantity: number;
  expiration_date: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  category: {
    data: ICategory;
  };
  sub_category: {
    data: ISubCategory;
  };
}
