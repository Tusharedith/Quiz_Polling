import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'

import { 
  setCurrentPoll, 
  clearCurrentPoll, 
  setPollHistory, 
  setStudents, 
  updatePollResults 
} from '../store/slices/pollSlice'
import { setConnected, setHasResponded, setKicked } from '../store/slices/userSlice'
import { addMessage, setMessages } from '../store/slices/chatSlice'

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const { role, name } = useSelector((state) => state.user)

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    newSocket.on('connect', () => {
      dispatch(setConnected(true))
    })

    newSocket.on('disconnect', () => {
      dispatch(setConnected(false))
    })

    newSocket.on('poll-update', (pollData) => {
      dispatch(setCurrentPoll(pollData))
      if (pollData.hasResponded !== undefined) {
        dispatch(setHasResponded(pollData.hasResponded))
      }
    })

    newSocket.on('poll-ended', (pollData) => {
      dispatch(setCurrentPoll(pollData))
      dispatch(setHasResponded(false))
    })

    newSocket.on('students-update', (students) => {
      console.log('Received students-update:', students)
      dispatch(setStudents(students))
    })

    newSocket.on('poll-history', (history) => {
      dispatch(setPollHistory(history))
    })

    newSocket.on('name-taken', () => {
      alert('This name is already taken. Please choose a different name.')
    })

    newSocket.on('kicked-out', () => {
      dispatch(setKicked(true))
    })

    newSocket.on('new-message', (message) => {
      dispatch(addMessage(message))
    })

    newSocket.on('chat-history', (messages) => {
      dispatch(setMessages(messages))
    })
    return () => {
      newSocket.close()
    }
  }, [dispatch])

  useEffect(() => {
    if (socket && role === 'teacher') {
      socket.emit('teacher-join')
      socket.emit('get-messages')
    } else if (socket && role === 'student' && name) {
      socket.emit('student-join', { name })
      socket.emit('get-messages')
    }
  }, [socket, role, name])

  const joinAsTeacher = () => {
    if (socket) {
      socket.emit('teacher-join')
    }
  }

  const joinAsStudent = (studentName) => {
    if (socket) {
      socket.emit('student-join', { name: studentName })
    }
  }

  const createPoll = (pollData) => {
    if (socket) {
      socket.emit('create-poll', pollData)
    }
  }

  const submitResponse = (selectedOption) => {
    if (socket) {
      socket.emit('submit-response', { selectedOption })
    }
  }

  const removeStudent = (studentId) => {
    if (socket) {
      socket.emit('remove-student', { studentId })
    }
  }

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('send-message', {
        message,
        senderType: role,
        senderName: role === 'teacher' ? 'Teacher' : name
      })
    }
  }

  const value = {
    socket,
    joinAsTeacher,
    joinAsStudent,
    createPoll,
    submitResponse,
    removeStudent,
    sendMessage
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}