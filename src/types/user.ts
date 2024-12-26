import { IVendor } from "./vendor";

export const USER_ROLE = {
  customer: "customer",
  admin: "admin",
  vendor: "vendor",
} as const;

export type UserRoles = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
  role: "admin" | "customer" | "vendor";
  status: "active" | "suspended" | "blocked";
  isDeleted: boolean;
  followedVendors: string[];
  vendor: IVendor;
}

export interface IGetUpdateUSERProfileResponse {
  success: boolean;
  message: string;
  data: IUser;
}
