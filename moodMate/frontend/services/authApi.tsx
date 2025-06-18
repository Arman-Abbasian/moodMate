import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './globalApi'

export const AuthApi = createApi({
  reducerPath: 'Auth', // Unique key for the reducer
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth'], // Tags for caching
  endpoints: (builder) => ({
    // Read

    // Create
    Login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    Signup: builder.mutation({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
    }),

    // Update

    // Delete
  }),
})

export const { useLoginMutation, useSignupMutation } = AuthApi
