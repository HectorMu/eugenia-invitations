import { configureStore } from '@reduxjs/toolkit'
import MockSessionReducer from './slices/MockSessionSlice'

export const MockStore = configureStore({
  reducer: {
    session: MockSessionReducer
  }
})
