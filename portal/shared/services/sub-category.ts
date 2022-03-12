import { ISubCategory, IApiResponse } from "@types";
import { API } from "../../utils/axios";

const find = async (
  query?: Record<string, unknown>
): Promise<IApiResponse<ISubCategory>> => {
  const { data, status } = await API({
    url: "/sub-categories",
    method: "get",
    query,
  });

  return {
    data,
    status,
  };
};

export interface CreateSubCategoryDTO {
  name: string;
  code: string;
  category: string | number;
}

const create = async (
  payload: CreateSubCategoryDTO
): Promise<IApiResponse<ISubCategory>> => {
  const body = {
    ...payload,
    settings: {
      created_by: "user",
      updated_by: "user",
    },
  };

  const { data, status } = await API({
    url: "/sub-categories",
    method: "post",
    body,
  });

  return { data, status };
};

export const SubCategoryService = { find, create };
