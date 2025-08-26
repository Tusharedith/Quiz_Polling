import React, { useState } from 'react'
import { Users } from 'lucide-react'

const StudentSetup = ({ onSubmit }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-3">
            Ready to Join?
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Enter your name and dive into the live polling experience ✨
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Your name..."
                className="w-full p-4 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                maxLength={50}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 from-opacity-20 to-blue-500 to-opacity-20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="group w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 px-6 rounded-xl hover:from-cyan-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-cyan-400 hover:shadow-opacity-25 hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Let's Go!</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">🚀</span>
            </span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full border border-white border-opacity-20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute -z-10 inset-0 overflow-hidden rounded-3xl">
          <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  )
}

export default StudentSetup
