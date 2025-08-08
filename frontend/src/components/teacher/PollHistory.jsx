import React from 'react'
import { useSelector } from 'react-redux'
import { History, BarChart3, Calendar, Users } from 'lucide-react'

const PollHistory = () => {
  const { pollHistory } = useSelector((state) => state.poll)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <History className="w-6 h-6 text-primary-500" />
          <h2 className="text-xl font-bold text-gray-900">Poll History</h2>
        </div>
      </div>

      <div className="p-6">
        {pollHistory.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Poll History</h3>
            <p className="text-gray-600">
              Completed polls will appear here for your reference
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pollHistory.map((poll, index) => (
              <div key={poll.id} className="border border-gray-200 rounded-lg p-6">
                {/* Poll Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Question {pollHistory.length - index}
                    </h3>
                    <p className="text-gray-700 mb-3">{poll.question}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(poll.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{poll.responses.length} responses</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3">
                  {poll.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-medium">{result.option}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{result.votes} votes</span>
                          <span className="text-sm font-bold text-primary-600">{result.percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Poll Stats */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {poll.responses.length}
                      </div>
                      <div className="text-sm text-gray-600">Total Votes</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {poll.timeLimit}s
                      </div>
                      <div className="text-sm text-gray-600">Time Limit</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {poll.options.length}
                      </div>
                      <div className="text-sm text-gray-600">Options</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PollHistory