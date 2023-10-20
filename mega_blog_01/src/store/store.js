import { configureStore } from '@reduxjs/toolkit'
import authSliceReducers from '../app/auth/authSlice'

export const store = configureStore({
    reducer: {
        authSliceReducers
    }
})