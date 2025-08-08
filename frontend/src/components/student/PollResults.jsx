import React from 'react'
import { BarChart3, Users, Trophy } from 'lucide-react'

const PollResults = ({ poll }) => {
  if (!poll || !poll.results) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Available</h3>
        <p className="text-gray-600">Poll results will appear here once available.</p>
      </div>
    )
  }

  const { question, results, totalVotes, status } = poll
  const topResult = results.reduce((prev, current) => 
    (prev.percentage > current.percentage) ? prev : current
  )

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Poll Results</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{totalVotes} votes</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-lg text-gray-900">{question}</p>
        </div>

        {status === 'completed' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">
                Poll completed! Here are the final results.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Results Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Results Breakdown</h3>
        
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 font-medium">{result.option}</span>
                  {result.option === topResult.option && result.percentage > 0 && (
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{result.votes} votes</span>
                  <span className="text-lg font-bold text-primary-600">{result.percentage}%</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ease-out ${
                    result.option === topResult.option && result.percentage > 0
                      ? 'bg-yellow-400'
                      : 'bg-primary-500'
                  }`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {totalVotes === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>No votes recorded yet...</p>
          </div>
        )}
      </div>

      {/* {status === 'active' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">
                Live Results
              </p>
              <p className="text-sm text-blue-700">
                These results are updating in real-time as other students vote.
              </p>
            </div>
          </div>
        </div>
      )} */}

      {status === 'active' && (
        <div className="text-center">
          <p className="text-gray-600">
            Wait for the teacher to ask a new question...
          </p>
        </div>
      )}
    </div>
  )
}

export default PollResults