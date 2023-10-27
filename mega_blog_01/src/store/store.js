import { configureStore } from '@reduxjs/toolkit'
import authSliceReducers from '../features/auth/authSlice'

export const store = configureStore({
    reducer: authSliceReducers
})