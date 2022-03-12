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

export const CategoryService = { find };
