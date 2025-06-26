// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { MoodApi } from './services/MoodApi'
import { AuthApi } from './services/AuthApi'

export const store = configureStore({
  reducer: {
    [MoodApi.reducerPath]: MoodApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(MoodApi.middleware)
      .concat(AuthApi.middleware),
})

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
