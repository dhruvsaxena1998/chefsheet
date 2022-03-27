import { IProfileImage } from "./profile_image";

export interface StrapiUser {
  blocked: boolean;
  confirmed: boolean;
  username: string;
  email: string;
  id?: number;
  provider: "local";
  createdAt: Date;
  updatedAt: Date;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  type: "authenticated";
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id?: number;
  username: string;
  email: string;
  name: string;
  blocked: boolean;
  access: Record<string, unknown>;
  settings: Record<string, unknown>;
  role: IRole;
  gender: "Male" | "Female" | "Prefer not to say";
  contact_number: string;
  country_code: string;
  createdAt: Date;
  updatedAt: Date;
  profile_image?: {
    data: IProfileImage;
  };
  clients?: {
    data: {};
  };
  staff_members?: {
    data: {};
  };
  inventories?: {
    data: {};
  };
  user?: {
    data: StrapiUser;
  };
}
