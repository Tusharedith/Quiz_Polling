import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../context/SocketContext'
import { setName, setHasResponded } from '../store/slices/userSlice'
import { toggleChat } from '../store/slices/chatSlice'
import StudentSetup from './student/StudentSetup'
import WaitingRoom from './student/WaitingRoom'
import PollQuestion from './student/PollQuestion'
import PollResults from './student/PollResults'
import Chat from './Chat'
import { Users, MessageCircle, Wifi, Crown, Sparkles, Zap, AlertCircle, Home, Star } from 'lucide-react'

const StudentDashboard = () => {
  const dispatch = useDispatch()
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
      // Navigate to home - implement based on your routing setup
    }
  }, [isKicked])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 text-center bg-black/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10 max-w-lg w-full">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-purple-500/30 animate-spin animate-reverse"></div>
              <div className="absolute inset-4 rounded-full border-4 border-pink-500/30 animate-spin"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-ping"></div>
            </div>
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Connecting to Universe
          </h3>
          <p className="text-purple-200 text-lg mb-6">Establishing secure connection...</p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    )
  }

  if (isKicked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-orange-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-lg mx-4 border border-red-500/20">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto shadow-xl border border-red-400/30">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-6">
            Access Denied
          </h2>
          <p className="text-red-200 mb-8 text-lg leading-relaxed">
            You have been removed from the session by the teacher.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="group relative w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg border border-red-400/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="relative flex items-center justify-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Return to Home</span>
            </div>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="relative">
                    <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                    <div className="absolute inset-0 text-yellow-400 animate-ping opacity-75">
                      <Star className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  Welcome, <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">{name}</span>
                </h1>
                <p className="text-purple-200 font-medium text-lg">Student Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-green-500/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-green-400/30 shadow-lg">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-green-100 font-semibold">Connected</span>
                <Wifi className="w-5 h-5 text-green-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="relative z-10 bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-4">
            {currentPoll ? (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-200 font-medium">
                  {currentPoll.status === 'active' && !hasResponded 
                    ? 'Poll Active - Answer Now!' 
                    : currentPoll.status === 'completed' || hasResponded 
                    ? 'Poll Completed - Viewing Results' 
                    : 'Poll Ready'
                  }
                </span>
                {currentPoll.status === 'active' && !hasResponded && (
                  <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-200 font-medium">Waiting for poll...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          {/* Content Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm px-8 py-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                {!currentPoll ? (
                  <Users className="w-4 h-4 text-white" />
                ) : currentPoll.status === 'active' && !hasResponded ? (
                  <Zap className="w-4 h-4 text-white animate-pulse" />
                ) : (
                  <Star className="w-4 h-4 text-white" />
                )}
              </div>
              <h2 className="text-xl font-bold text-white">
                {!currentPoll 
                  ? 'Waiting Room' 
                  : currentPoll.status === 'active' && !hasResponded 
                  ? 'Active Poll' 
                  : 'Poll Results'
                }
              </h2>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-1000 opacity-60"></div>
      <div className="absolute top-1/2 right-40 w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-500 opacity-40"></div>
      <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300 opacity-50"></div>

      {/* Active Poll Indicator */}
      {currentPoll?.status === 'active' && !hasResponded && (
        <div className="fixed bottom-24 right-8 z-40">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-xl border border-green-400/30 backdrop-blur-sm animate-bounce">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">Answer Now!</span>
            </div>
          </div>
        </div>
      )}

      {/* Chat Component - handles its own toggle button */}
      <Chat />
    </div>
  )
}

export default StudentDashboard
