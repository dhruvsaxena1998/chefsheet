import axios from "axios";
import * as qs from "qs";

export const client = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface IOptions {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: any;
  params?: any;
  headers?: any;
  query?: any;
}

export const API = async (options: IOptions) => {
  let url = options.url;
  const { method, body, params, headers, query } = options;

  if (query) {
    url += `?${qs.stringify(query)}`;
  }

  const { data, status } = await client[method](url, {
    data: body,
    headers,
  });

  return { data, status };
};
