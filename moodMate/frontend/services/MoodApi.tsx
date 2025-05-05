import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from './globalApi'

export const MoodApi = createApi({
  reducerPath: 'Mood', // Unique key for the reducer
  baseQuery: baseQuery,
  tagTypes: ['Mood'], // Tags for caching
  endpoints: (builder) => ({
    // Read
    // GetَAllDoctorOrderFormBySerial: builder.query({
    //   query: (serial) => ({
    //     url: `api/DigitalFiles/DoctorOrderForm/GetAllDoctorOrderFormBySerial?serial=${serial}`,
    //     method: 'POST',
    //   }),
    //   providesTags: ['DoctorOrderForm'],
    // }),

    // Create
    AddMood: builder.mutation({
      query: (body) => ({
        url: '/mood',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Mood'],
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

export const { useAddMoodMutation } = MoodApi
