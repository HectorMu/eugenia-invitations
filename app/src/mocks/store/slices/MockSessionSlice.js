import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: JSON.parse(window.localStorage.getItem('APP_SESSION')) ?? null
}

export const TEST_LS_NAME = 'TEST_APP_SESSION'

export const TestSessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action) => {
      window.localStorage.setItem(
        TEST_LS_NAME,
        JSON.stringify({
          name: 'Test User',
          email: 'test_user@gmail.com',
          token: 'TEST_TOKEN'
        })
      )
      state.user = action.payload
    },
    logout: (state) => {
      window.localStorage.removeItem(TEST_LS_NAME)
      state.user = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = TestSessionSlice.actions

export default TestSessionSlice.reducer
