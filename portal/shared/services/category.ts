import { ICategory, IApiResponse } from "@types";
import { API } from "../../utils/axios";

const find = async (
  query?: Record<string, unknown>
): Promise<IApiResponse<ICategory>> => {
  const { data, status } = await API({
    url: "/categories",
    method: "get",
    query,
  });

  return {
    data,
    status,
  };
};

const findOne = async (
  id: number,
  query?: Record<string, unknown>
): Promise<IApiResponse<ICategory>> => {
  const { data, status } = await API({
    url: `/categories/${id}`,
    method: "get",
    query,
  });

  return { data, status };
};

export interface CreateCategoryDTO {
  name: string;
  code: string;
}

const create = async (
  payload: CreateCategoryDTO
): Promise<IApiResponse<ICategory>> => {
  const body = {
    ...payload,
    settings: {
      created_by: "user",
      updated_by: "user",
    },
  };

  const { data, status } = await API({
    url: "/categories",
    method: "post",
    body,
  });

  return { data, status };
};

export interface UpdateCategoryDTO {
  name: string;
}

const update = async (
  id: number,
  payload: UpdateCategoryDTO
): Promise<IApiResponse<ICategory>> => {
  const { data, status } = await API({
    url: `/categories/${id}`,
    method: "put",
    body: payload,
  });

  return { data, status };
};

const remove = async (id: number): Promise<IApiResponse<ICategory>> => {
  const { data, status } = await API({
    url: `/categories/${id}`,
    method: "delete",
  });

  return { data, status };
};

export const CategoryService = { find, findOne, create, update, remove };
