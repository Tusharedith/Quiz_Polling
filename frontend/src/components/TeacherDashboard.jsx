import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../context/SocketContext'
import CreatePoll from './teacher/CreatePoll'
import PollResults from './teacher/PollResults'
import StudentsList from './teacher/StudentsList'
import PollHistory from './teacher/PollHistory'
import Chat from './Chat'
import { Users, BarChart3, History, MessageCircle, Plus, Zap, Eye } from 'lucide-react'

const TeacherDashboard = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('create')
  const { currentPoll, students } = useSelector((state) => state.poll)
  const { isConnected } = useSelector((state) => state.user)

  console.log('Students in TeacherDashboard:', students)
  console.log('Students length:', students.length)

  const tabs = [
    { 
      id: 'create', 
      label: 'Create Poll', 
      icon: Plus,
      gradient: 'from-violet-600 to-purple-600',
      hoverGradient: 'from-violet-500 to-purple-500'
    },
    { 
      id: 'results', 
      label: 'Results', 
      icon: BarChart3, 
      disabled: !currentPoll,
      gradient: 'from-emerald-600 to-teal-600',
      hoverGradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'students', 
      label: `Students (${students.length})`, 
      icon: Users,
      gradient: 'from-blue-600 to-cyan-600',
      hoverGradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'history', 
      label: 'History', 
      icon: History,
      gradient: 'from-orange-600 to-red-600',
      hoverGradient: 'from-orange-500 to-red-500'
    }
  ]

  useEffect(() => {
    if (currentPoll?.status === 'active' && activeTab === 'create') {
      setActiveTab('results')
    }
  }, [currentPoll?.status])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/30 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-purple-500/10 animate-ping"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Connecting to Universe</h2>
          <p className="text-purple-200 animate-pulse">Establishing secure connection...</p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black/20 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Teacher Dashboard
                </h1>
                <p className="text-sm text-purple-200/70">Manage your classroom experience</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-400/30">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-sm text-green-200 font-medium">Live Connection</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">{students.length} Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 bg-black/10 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 py-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  className={`relative group px-6 py-4 rounded-2xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl shadow-purple-500/25`
                      : tab.disabled
                      ? 'text-gray-500 cursor-not-allowed opacity-50'
                      : `text-purple-200 hover:text-white hover:bg-gradient-to-r ${tab.hoverGradient} hover:shadow-xl hover:shadow-purple-500/20`
                  }`}
                  disabled={tab.disabled}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                  )}
                  <div className="relative flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform duration-300'}`} />
                    <span className="font-semibold">{tab.label}</span>
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/50 rounded-full"></div>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          {/* Content header with animation */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                {tabs.find(tab => tab.id === activeTab)?.icon && 
                  React.createElement(tabs.find(tab => tab.id === activeTab).icon, { className: "w-4 h-4 text-white" })
                }
              </div>
              <h2 className="text-xl font-bold text-white">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
            </div>
            <div className="h-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded-full"></div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">
            {activeTab === 'create' && <CreatePoll />}
            {activeTab === 'results' && <PollResults setActiveTab={setActiveTab} />}
            {activeTab === 'students' && <StudentsList />}
            {activeTab === 'history' && <PollHistory />}
          </div>
        </div>
      </div>

      {/* Chat Component - handles its own toggle button */}
      <Chat />

      {/* Floating action indicator */}
      {currentPoll?.status === 'active' && (
        <div className="fixed bottom-24 right-8 z-40">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg border border-green-400/30 backdrop-blur-sm animate-bounce">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Poll Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeacherDashboard
