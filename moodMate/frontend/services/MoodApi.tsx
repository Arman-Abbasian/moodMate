import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './globalApi'

export const MoodApi = createApi({
  reducerPath: 'Mood', // Unique key for the reducer
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Mood'], // Tags for caching
  endpoints: (builder) => ({
    // Read
    GetَAllMoods: builder.query({
      query: () => ({
        url: `mood/statistics`,
        method: 'GET',
      }),
      providesTags: ['Mood'],
    }),

    // Create
    AddMood: builder.mutation({
      query: (body) => ({
        url: 'mood',
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['Mood'],
    }),

    // Update
    // EditDoctorOrderForm: builder.mutation({
    //   query: (body) => ({
    //     url: 'api/DigitalFiles/DoctorOrderForm/UpdateDoctorOrderForm',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Mood'],
    // }),

    // ConfirmDoctorOrderForm: builder.mutation({
    //   query: (body) => ({
    //     url: 'api/DigitalFiles/DoctorOrderForm/ConfirmDoctorOrderForm',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Mood'],
    // }),

    // DCDoctorOrderForm: builder.mutation({
    //   query: ({ masterId, detailId, detailType }) => ({
    //     url: `api/DigitalFiles/DoctorOrderForm/DiscontinuedDoctorOrderFormDetail?masterId=${masterId}&detailId=${detailId}&detailType=${detailType}`,
    //     method: 'POST',
    //   }),
    //   invalidatesTags: ['Mood'],
    // }),

    // Delete
    // DeleteDoctorOrderForm: builder.mutation({
    //   query: (id) => ({
    //     url: `api/DigitalFiles/DoctorOrderForm/RemoveDoctorOrderForm?id=${id}`,
    //     method: 'POST',
    //   }),
    //   invalidatesTags: ['Mood'],
    // }),
  }),
})

export const { useAddMoodMutation, useGetَAllMoodsQuery } = MoodApi
