// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { MoodApi } from './services/MoodApi'

export const store = configureStore({
  reducer: {
    [MoodApi.reducerPath]: MoodApi.reducer, // RTK Query API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(MoodApi.middleware),
})

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
