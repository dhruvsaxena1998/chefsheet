import { IAddress } from "./address";

export interface IStaffMember {
  id?: number;
  name: string;
  contact_number: string;
  country_code: string;
  role: "employee" | "manager" | "contract";
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  access: Record<string, unknown>;
  address?: IAddress;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
