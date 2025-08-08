import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSocket } from '../../context/SocketContext'
import { setHasResponded } from '../../store/slices/userSlice'
import { Clock, CheckCircle } from 'lucide-react'

const PollQuestion = ({ poll }) => {
  const dispatch = useDispatch()
  const { submitResponse } = useSocket()
  const [selectedOption, setSelectedOption] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const startTime = new Date(poll.createdAt).getTime()
    const duration = poll.timeLimit * 1000
    
    const timer = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime
      const remaining = Math.max(0, duration - elapsed)
      
      setTimeLeft(Math.ceil(remaining / 1000))
      
      if (remaining <= 0) {
        clearInterval(timer)
        if (!hasSubmitted && selectedOption) {
          handleSubmit()
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [poll.createdAt, poll.timeLimit])

  const handleSubmit = () => {
    if (!selectedOption || hasSubmitted) return
    
    setHasSubmitted(true)
    submitResponse(selectedOption)
    dispatch(setHasResponded(true))
  }

  const handleOptionSelect = (option) => {
    if (!hasSubmitted && timeLeft > 0) {
      setSelectedOption(option)
    }
  }

  const isTimeUp = timeLeft <= 0
  const canSubmit = selectedOption && !hasSubmitted && !isTimeUp

  return (
    <div className="space-y-6">
      {/* Timer */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Question</h2>
          <div className={`flex items-center space-x-2 ${timeLeft <= 10 ? 'text-red-600' : 'text-primary-600'}`}>
            <Clock className="w-5 h-5" />
            <span className="font-bold text-lg">{timeLeft}s</span>
          </div>
        </div>

        <div className="mb-4">
          <div className={`w-full bg-gray-200 rounded-full h-3 ${timeLeft <= 10 ? 'bg-red-100' : ''}`}>
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-linear ${
                timeLeft <= 10 ? 'bg-red-500' : 'bg-primary-500'
              }`}
              style={{ 
                width: `${((poll.timeLimit - timeLeft) / poll.timeLimit) * 100}%` 
              }}
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-lg text-gray-900">{poll.question}</p>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose your answer:</h3>
        
        <div className="space-y-3">
          {poll.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={hasSubmitted || isTimeUp}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                selectedOption === option
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : hasSubmitted || isTimeUp
                  ? 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {selectedOption === option && (
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
              canSubmit
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasSubmitted ? 'Answer Submitted!' : isTimeUp ? 'Time\'s Up!' : 'Submit Answer'}
          </button>
        </div>

        {hasSubmitted && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">
                Your answer has been recorded!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PollQuestion