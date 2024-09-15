import { METHOD, tagTypes } from "@/redux/api/tagTypesList";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    resendOTP: builder.mutation({
      query: (otpInfo) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: otpInfo,
      }),
    }),
    verifyUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/verify-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    googleAuthRegister: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/google-auth",
        method: METHOD.POST,
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: METHOD.POST,
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: userInfo,
      }),
    }),
    getUsers: builder.query({
      query: (filterOptions) => ({
        url: `/auth/users${filterOptions ? `?${filterOptions}` : ""}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getUserProfile: builder.query({
      query: (username) => ({
        url: `/auth/user/${username}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUserProfile: builder.mutation({
      query: (info) => {
        return {
          url: `/auth/update-profile`,
          method: "PUT",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleAuthRegisterMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useResendOTPMutation,
  useVerifyUserMutation,
} = authApi;
