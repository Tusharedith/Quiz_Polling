import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Clock, Users, BarChart3 } from 'lucide-react'
import { resetCurrentPoll, addToPollHistory } from '../../store/slices/pollSlice'

const PollResults = ({ setActiveTab }) => {
  const dispatch = useDispatch()
  const { currentPoll } = useSelector((state) => state.poll)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (!currentPoll || currentPoll.status !== 'active') return

    const startTime = new Date(currentPoll.createdAt).getTime()
    const duration = currentPoll.timeLimit * 1000

    const timer = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime
      const remaining = Math.max(0, duration - elapsed)

      setTimeLeft(Math.ceil(remaining / 1000))

      if (remaining <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentPoll])

  const handleAskNextQuestion = () => {
    // First, save the current poll to history
    if (currentPoll) {
      const pollToSave = {
        ...currentPoll,
        completedAt: new Date().toISOString(), // Add completion timestamp
        // Make sure we have all required fields for PollHistory component
        id: currentPoll.id || Date.now().toString(),
        question: currentPoll.question,
        results: currentPoll.results || [],
        responses: currentPoll.responses || [], // For the history display
        timeLimit: currentPoll.timeLimit,
        options: currentPoll.options || [],
        createdAt: currentPoll.createdAt
      }
      dispatch(addToPollHistory(pollToSave))
    }
    
    // Then reset current poll and navigate to create
    dispatch(resetCurrentPoll())
    setActiveTab('create')
  }

  if (!currentPoll) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Poll</h3>
        <p className="text-gray-600">Create a poll to see results here.</p>
      </div>
    )
  }

  const { question, results = [], totalVotes, totalStudents, status } = currentPoll

  return (
    <div className="space-y-6">
      {/* Poll Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Current Poll</h2>
          <div className="flex items-center space-x-4">
            {status === 'active' && (
              <div className="flex items-center space-x-2 text-primary-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{timeLeft}s</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{totalVotes}/{totalStudents} responses</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-lg text-gray-900">{question}</p>
        </div>

        {status === 'active' && timeLeft > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Time Remaining</span>
              <span>{timeLeft} seconds</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${((currentPoll.timeLimit - timeLeft) / currentPoll.timeLimit) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Live Results</h3>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium">{result.option}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{result.votes} votes</span>
                  <span className="text-lg font-bold text-primary-600">{result.percentage}%</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {totalVotes === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>Waiting for student responses...</p>
          </div>
        )}
      </div>

      {/* Manual End Poll Button for Active Polls */}
      {status === 'active' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-center">
            <p className="text-blue-800 mb-4">Poll is currently active</p>
            <button
              onClick={handleAskNextQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              End Poll & Ask Next Question
            </button>
          </div>
        </div>
      )}

      {/* Completion Message + Ask Next Question Button */}
      {(status === 'completed' || timeLeft === 0) && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Poll Completed!
              </p>
              <p className="text-sm text-green-700">
                All students have responded or time has expired.
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleAskNextQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Ask Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PollResults