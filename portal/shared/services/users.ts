import { IApiResponse, IApiResponseSingle, Items, IUser } from "@types";
import { API, client } from "@utils/axios";

const find = async (
  query?: Record<string, unknown>
): Promise<IApiResponse<IUser>> => {
  const { data, status } = await API({
    url: "/users",
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
): Promise<IApiResponseSingle<IUser>> => {
  const { data, status } = await API({
    url: `/users/${id}`,
    method: "get",
    query,
  });

  return { data, status };
};

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  country_code: string;
  contact_number: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  role: "admin" | "editor" | "viewer";
}

const create = async (payload: CreateUserDTO): Promise<IApiResponse<IUser>> => {
  const { data, status } = await client.post("/auth/local/register", payload);

  return { data, status };
};

export interface UpdateUserDTO {
  name: string;
  contact_number: string;
}

const update = async (
  id: number,
  payload: UpdateUserDTO
): Promise<IApiResponse<IUser>> => {
  const { data, status } = await client.put(`/users/${id}`, payload);

  return { data, status };
};

const remove = async (id: number): Promise<IApiResponse<IUser>> => {
  const { data, status } = await API({
    url: `/users/${id}`,
    method: "delete",
  });

  return { data, status };
};

export const UserService = { find, findOne, create, update, remove };
