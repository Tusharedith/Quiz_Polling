import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../context/SocketContext'
import { setName, setHasResponded } from '../store/slices/userSlice'
import { toggleChat } from '../store/slices/chatSlice'
import StudentSetup from './student/StudentSetup'
import WaitingRoom from './student/WaitingRoom'
import PollQuestion from './student/PollQuestion'
import PollResults from './student/PollResults'
import Chat from './Chat'
import { Users, MessageCircle } from 'lucide-react'

const StudentDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { joinAsStudent } = useSocket()
  const { name, isConnected, hasResponded, isKicked } = useSelector((state) => state.user)
  const { currentPoll } = useSelector((state) => state.poll)

  const handleNameSubmit = (studentName) => {
    dispatch(setName(studentName))
    joinAsStudent(studentName)
  }

  useEffect(() => {
    if (isKicked) {
      alert('You have been removed from the session by the teacher.')
      navigate('/')
    }
  }, [isKicked, navigate])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to server...</p>
        </div>
      </div>
    )
  }

  if (isKicked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You've been kicked out!</h2>
          <p className="text-gray-600 mb-6">
            You have been removed from the session by the teacher.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  if (!name) {
    return <StudentSetup onSubmit={handleNameSubmit} />
  }

  const renderContent = () => {
    if (!currentPoll) {
      return <WaitingRoom />
    }

    if (currentPoll.status === 'active' && !hasResponded) {
      return <PollQuestion poll={currentPoll} />
    }

    return <PollResults poll={currentPoll} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Welcome, {name}</h1>
                <p className="text-sm text-gray-500">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>

      {/* Chat Component - handles its own toggle button */}
      <Chat />
    </div>
  )
}

export default StudentDashboard
