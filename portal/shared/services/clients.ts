import { ISubCategory, IApiResponse, IClient } from "@types";
import { API } from "@utils/axios";

const find = async (
  query?: Record<string, unknown>
): Promise<IApiResponse<IClient>> => {
  const { data, status } = await API({
    url: "/clients",
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
): Promise<IApiResponse<IClient>> => {
  const { data, status } = await API({
    url: `/clients/${id}`,
    method: "get",
    query,
  });

  return { data, status };
};

export interface ClientDTO {
  name: string;
  email: string;
  country_code: string;
  contact_number: string;
  settings?: Record<string, unknown>;
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

const create = async (payload: ClientDTO): Promise<IApiResponse<IClient>> => {
  const body = {
    ...payload,
    settings: {
      created_by: "user",
      updated_by: "user",
    },
  };

  const { data, status } = await API({
    url: "/clients",
    method: "post",
    body,
  });

  return { data, status };
};

const update = async (
  id: number,
  payload: ClientDTO
): Promise<IApiResponse<IClient>> => {
  const { data, status } = await API({
    url: `/clients/${id}`,
    method: "put",
    body: payload,
  });

  return { data, status };
};

const remove = async (id: number): Promise<IApiResponse<IClient>> => {
  const { data, status } = await API({
    url: `/clients/${id}`,
    method: "delete",
  });

  return { data, status };
};

export const ClientService = { find, findOne, create, update, remove };
