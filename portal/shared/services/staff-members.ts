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

export interface StaffMemberDTO {
  name: string;
  country_code: string;
  contact_number: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  role: "employee" | "manager" | "contract";
  address: {
    plot_no: string;
    line_1: string;
    line_2: string;
    state: string;
    city: string;
    postal_code: number;
    country: string;
  };
}

const create = async (
  payload: StaffMemberDTO
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

const update = async (
  id: number,
  payload: StaffMemberDTO
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
