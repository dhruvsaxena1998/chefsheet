import { API } from "../../utils/axios";

export interface ICategory {
  name: string;
  code: string;
}

export const getCategoriesCount = (code: string) => {
  return API.get(`/categories/count?code=${code}`);
};

export const createCategory = (category: ICategory) => {
  return API.post("/categories", category);
};
