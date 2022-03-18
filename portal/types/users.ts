import { IProfileImage } from "./profile_image";

export interface IUser {
  id?: 1;
  username: string;
  email: string;
  name: string;
  blocked: boolean;
  access: Record<string, unknown>;
  settings: Record<string, unknown>;
  role: "admin" | "editor" | "viewer";
  gender: "Male" | "Female" | "Prefer not to say";
  contact_number: string;
  country_code: string;
  createdAt: Date;
  updatedAt: Date;
  profile_image?: {
    data: IProfileImage;
  };
  clients: {
    data: {};
  };
  staff_members: {
    data: {};
  };
  inventories: {
    data: {};
  };
}
