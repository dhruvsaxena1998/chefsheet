import { ISubCategory, IApiResponse } from "@types";
import { API } from "@utils/axios";

const find = async (
  query?: Record<string, unknown>
): Promise<IApiResponse<ISubCategory>> => {
  const { data, status } = await API({
    url: "/staff-members",
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
): Promise<IApiResponse<ISubCategory>> => {
  const { data, status } = await API({
    url: `/staff-members/${id}`,
    method: "get",
    query,
  });

  return { data, status };
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
    url: "/staff-members",
    method: "post",
    body,
  });

  return { data, status };
};

export interface UpdateSubCategoryDTO {
  name: string;
}

const update = async (
  id: number,
  payload: UpdateSubCategoryDTO
): Promise<IApiResponse<ISubCategory>> => {
  const { data, status } = await API({
    url: `/staff-members/${id}`,
    method: "put",
    body: payload,
  });

  return { data, status };
};

const remove = async (id: number): Promise<IApiResponse<ISubCategory>> => {
  const { data, status } = await API({
    url: `/staff-members/${id}`,
    method: "delete",
  });

  return { data, status };
};

export const StaffMemberService = { find, findOne, create, update, remove };
