import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPoll: null,
  pollHistory: [],
  students: [],
  isLoading: false
}

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setCurrentPoll: (state, action) => {
      state.currentPoll = action.payload
    },
    clearCurrentPoll: (state) => {
      state.currentPoll = null
    },
    setPollHistory: (state, action) => {
      state.pollHistory = action.payload
    },
    addToPollHistory: (state, action) => {
      state.pollHistory.unshift(action.payload)
    },
    setStudents: (state, action) => {
      state.students = action.payload
    },
    resetCurrentPoll: (state) => {
      state.currentPoll = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    updatePollResults: (state, action) => {
      if (state.currentPoll) {
        state.currentPoll = { ...state.currentPoll, ...action.payload }
      }
    }
  }
})

export const {
  setCurrentPoll,
  clearCurrentPoll,
  setPollHistory,
  addToPollHistory,
  setStudents,
  setLoading,
  updatePollResults,
  resetCurrentPoll
} = pollSlice.actions

export default pollSlice.reducer