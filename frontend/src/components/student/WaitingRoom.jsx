import React from 'react'
import { Clock } from 'lucide-react'

const WaitingRoom = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 pulse-animation">
          <Clock className="w-8 h-8 text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Wait for the teacher to ask questions...
        </h2>
        <p className="text-gray-600">
          You'll see the poll question here when the teacher starts a new poll
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default WaitingRoom