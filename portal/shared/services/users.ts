import { IApiResponse, Items } from "@types";
import { API } from "@utils/axios";

const find = async (
  query?: Record<string, unknown>
): Promise<IApiResponse<Items>> => {
  const { data, status } = await API({
    url: "/admins",
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
): Promise<IApiResponse<Items>> => {
  const { data, status } = await API({
    url: `/items/${id}`,
    method: "get",
    query,
  });

  return { data, status };
};

export interface ItemsDTO {
  name: string;
  description: string;
  quantity: number;
  expiration_date: string;
  category: string | number;
  sub_category: string | number;
}

const create = async (payload: ItemsDTO): Promise<IApiResponse<Items>> => {
  const { data, status } = await API({
    url: "/items",
    method: "post",
    body: payload,
  });

  return { data, status };
};

const update = async (
  id: number,
  payload: ItemsDTO
): Promise<IApiResponse<Items>> => {
  const { data, status } = await API({
    url: `/items/${id}`,
    method: "put",
    body: payload,
  });

  return { data, status };
};

const remove = async (id: number): Promise<IApiResponse<Items>> => {
  const { data, status } = await API({
    url: `/items/${id}`,
    method: "delete",
  });

  return { data, status };
};

export const UserService = { find, findOne, create, update, remove };
