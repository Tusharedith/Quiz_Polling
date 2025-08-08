import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  role: null, // 'teacher' or 'student'
  name: null,
  isConnected: false,
  hasResponded: false,
  isKicked: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setConnected: (state, action) => {
      state.isConnected = action.payload
    },
    setHasResponded: (state, action) => {
      state.hasResponded = action.payload
    },
    setKicked: (state, action) => {
      state.isKicked = action.payload
    },
    resetUser: (state) => {
      return initialState
    }
  }
})

export const {
  setRole,
  setName,
  setConnected,
  setHasResponded,
  setKicked,
  resetUser
} = userSlice.actions

export default userSlice.reducer