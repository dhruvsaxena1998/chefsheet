import { API } from "../../utils/axios";

export interface ISubCategory {
  name: string;
  code: string;
  category: string;
}

export const getSubCategories = () => {
  return API.get("/sub-categories");
};

export const getSubCategoriesCount = (code: string) => {
  return API.get(`/sub-categories/count?code=${code}`);
};

export const getSubCategoryById = (id: string) => {
  return API.get(`/sub-categories/${id}`);
};

export const createSubCategory = (subCategory: ISubCategory) => {
  return API.post("/sub-categories", subCategory);
};

export const updateSubCategory = ({
  id,
  subcategory,
}: {
  id: string;
  subcategory: Pick<ISubCategory, "name">;
}) => {
  return API.put(`/sub-categories/${id}`, subcategory);
};

export const deleteSubCategory = (id: string) => {
  return API.delete(`/sub-categories/${id}`);
};
