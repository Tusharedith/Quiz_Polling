import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setRole } from '../store/slices/userSlice'
import { Users, UserCheck } from 'lucide-react'

const Welcome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectRole = (role) => {
    dispatch(setRole(role))
    navigate(`/${role}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to the Live Polling System
          </h1>
          <p className="text-gray-600 text-sm">
            Choose your role to get started with real-time polling
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => selectRole('student')}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-primary-100">
                <Users className="w-5 h-5 text-blue-600 group-hover:text-primary-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">I'm a Student</h3>
                <p className="text-sm text-gray-600">Join polling sessions and vote</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => selectRole('teacher')}
            className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-primary-100">
                <UserCheck className="w-5 h-5 text-green-600 group-hover:text-primary-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">I'm a Teacher</h3>
                <p className="text-sm text-gray-600">Create and manage polls</p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => selectRole('student')}
            className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Welcome