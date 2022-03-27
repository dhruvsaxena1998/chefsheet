import { IAddress } from "./address";

export interface IClient {
  id?: number;
  name: string;
  email: string;
  contact_number: string;
  country_code: string;
  settings: Record<string, unknown>;
  address?: IAddress;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  events: {
    data: Record<string, unknown>;
  };
}
