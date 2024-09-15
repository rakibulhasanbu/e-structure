import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypesList";
import { RootState } from "../app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set("authorization", accessToken);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,

  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
