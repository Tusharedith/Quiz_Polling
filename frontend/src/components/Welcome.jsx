import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setRole } from '../store/slices/userSlice'
import { Users, UserCheck, Sparkles, ArrowRight } from 'lucide-react'

const Welcome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectRole = (role) => {
    dispatch(setRole(role))
    navigate(`/${role}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'
    }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/15 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md transform hover:scale-105 transition-all duration-500">
        {/* Header section */}
        <div className="text-center mb-10">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <Users className="w-10 h-10 text-white" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Welcome to Live Polling
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Choose your role to dive into <br />
            <span className="font-medium text-indigo-600">real-time interactive polling</span>
          </p>
        </div>
        
        {/* Role selection cards */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => selectRole('student')}
            className="w-full group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-indigo-300 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Student</h3>
                  <p className="text-sm text-gray-600">Join sessions and participate in polls</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </button>
          
          <button
            onClick={() => selectRole('teacher')}
            className="w-full group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-emerald-300 hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UserCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Teacher</h3>
                  <p className="text-sm text-gray-600">Create and manage polling sessions</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </button>
        </div>
        
        {/* CTA Button */}
        <div className="pt-6 border-t border-gray-100/50">
          <button
            onClick={() => selectRole('student')}
            className="w-full relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative py-4 px-6 text-white font-bold text-lg flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform duration-200">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}

export default Welcome
