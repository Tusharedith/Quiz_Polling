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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Let's Get Started
          </h1>
          <p className="text-gray-600">
            Please enter your name to join the live polling session
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
              maxLength={50}
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Join Session
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Make sure your name is unique in this session</p>
        </div>
      </div>
    </div>
  )
}

export default StudentSetup