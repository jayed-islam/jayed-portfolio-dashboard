import { IUser } from "@/types/user";

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  description: string;
  banner: string;
  author: IUser;
  category: string;
  tags: string[];
  isPublished: boolean;
  isDeleted: boolean;
}
