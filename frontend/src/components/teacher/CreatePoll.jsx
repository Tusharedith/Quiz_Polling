import React, { useState } from 'react'
import { useSocket } from '../../context/SocketContext'
import { Plus, Trash2, Clock } from 'lucide-react'


const CreatePoll = ({ setActiveTab }) => {
  const { createPoll } = useSocket()
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [timeLimit, setTimeLimit] = useState(60)

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ''])
    }
  }

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!question.trim()) {
      alert('Please enter a question')
      return
    }

    const validOptions = options.filter(option => option.trim() !== '')
    if (validOptions.length < 2) {
      alert('Please provide at least 2 options')
      return
    }

    createPoll({
      question: question.trim(),
      options: validOptions,
      timeLimit
    })

    // Reset form
    setQuestion('')
    setOptions(['', ''])
    setTimeLimit(60)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's Get Started</h2>
        <p className="text-gray-600">
          Create a new poll question and set up the options for your students to vote on.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Input */}
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Poll Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your poll question..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            rows={3}
          />
        </div>

        {/* Time Limit */}
        <div>
          <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Time Limit (seconds)</span>
            </div>
          </label>
          <input
            type="number"
            id="timeLimit"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Math.max(10, Math.min(300, parseInt(e.target.value) || 60)))}
            min="10"
            max="300"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Options */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Poll Options
            </label>
            <button
              type="button"
              onClick={addOption}
              disabled={options.length >= 6}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              <span>Add Option</span>
            </button>
          </div>

          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
          >
            Start Poll
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePoll