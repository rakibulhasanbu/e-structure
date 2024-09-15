import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type TSocialLinks = {
  youtube?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  website?: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  emailVerified: string;
  isBlocked: boolean;
  image: string;
  isTwoFactorEnabled: string;
};

export const USER_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SELLER: "SELLER",
  USER: "USER",
} as const;

export const BookingStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

export const NotificationType = {
  comment: "comment",
  reply: "reply",
  like: "like",
};

export enum UserRole {
  User = "user",
  Seller = "seller",
  Admin = "admin",
  PRAdmin = "prAdmin",
  CCAdmin = "ccAdmin",
  FinanceAdmin = "financeAdmin",
  SuperAdmin = "superAdmin",
}

export type UserRoles = keyof typeof USER_ROLE;

export interface TNotification {
  deletedDocCount: string;
}

export type TResendToken = {
  email: string;
  token: number;
  expires: Date;
};

export interface ISearchParams {
  searchParams: { callbackUrl: string; email: string };
}

export type TGenericResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  error?: FetchBaseQueryError | SerializedError;
};
