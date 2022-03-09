import { API } from "../../utils/axios";

export interface ICategory {
  name: string;
  code: string;
}

export const createCategory = (category: ICategory) => {
  return API.post("/categories", category);
};

export const getCategoriesCount = (code: string) => {
  return API.get(`/categories/count?code=${code}`);
};

export const getCategories = () => {
  return API.get("/categories");
};

export const getCategoryById = (id: string) => {
  return API.get(`/categories/${id}`);
};

export const updateCategory = ({
  id,
  category,
}: {
  id: string;
  category: Pick<ICategory, "name">;
}) => {
  return API.put(`/categories/${id}`, category);
};

export const deleteCategory = (id: string) => {
  return API.delete(`/categories/${id}`);
};
