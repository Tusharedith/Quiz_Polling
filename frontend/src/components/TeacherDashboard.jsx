import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../context/SocketContext'
import CreatePoll from './teacher/CreatePoll'
import PollResults from './teacher/PollResults'
import StudentsList from './teacher/StudentsList'
import PollHistory from './teacher/PollHistory'
import Chat from './Chat'
import { Users, BarChart3, History, MessageCircle, Plus } from 'lucide-react'

const TeacherDashboard = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('create')
  const { currentPoll, students } = useSelector((state) => state.poll)
  const { isConnected } = useSelector((state) => state.user)

  console.log('Students in TeacherDashboard:', students)
  console.log('Students length:', students.length)

  const tabs = [
    { id: 'create', label: 'Create Poll', icon: Plus },
    { id: 'results', label: 'Results', icon: BarChart3, disabled: !currentPoll },
    { id: 'students', label: `Students (${students.length})`, icon: Users },
    { id: 'history', label: 'History', icon: History }
  ]

  useEffect(() => {
    if (currentPoll?.status === 'active' && activeTab === 'create') {
      setActiveTab('results')
    }
  }, [currentPoll?.status])

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Teacher Dashboard</h1>
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : tab.disabled
                      ? 'border-transparent text-gray-400 cursor-not-allowed'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  disabled={tab.disabled}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'create' && <CreatePoll />}
        {activeTab === 'results' && <PollResults setActiveTab={setActiveTab} />}
        {activeTab === 'students' && <StudentsList />}
        {activeTab === 'history' && <PollHistory />}
      </div>

      {/* Chat Component - handles its own toggle button */}
      <Chat />
    </div>
  )
}

export default TeacherDashboard
