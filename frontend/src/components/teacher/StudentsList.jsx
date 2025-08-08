import React from 'react'
import { useSelector } from 'react-redux'
import { useSocket } from '../../context/SocketContext'
import { Users, UserMinus, Clock } from 'lucide-react'

const StudentsList = () => {
  const { students, currentPoll } = useSelector((state) => state.poll)
  const { removeStudent } = useSocket()

  const getStudentStatus = (studentId) => {
    if (!currentPoll) return 'waiting'
    
    const hasResponded = currentPoll.responses?.some(r => r.studentId === studentId)
    if (hasResponded) return 'completed'
    
    if (currentPoll.status === 'active') return 'answering'
    return 'waiting'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'answering': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'answering': return 'Answering'
      default: return 'Waiting'
    }
  }

  const handleRemoveStudent = (studentId, studentName) => {
    if (window.confirm(`Are you sure you want to remove ${studentName}?`)) {
      removeStudent(studentId)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">Connected Students</h2>
          </div>
          <div className="text-sm text-gray-500">
            {students.length} student{students.length !== 1 ? 's' : ''} connected
          </div>
        </div>
      </div>

      <div className="p-6">
        {students.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Connected</h3>
            <p className="text-gray-600">
              Students will appear here when they join the session
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student) => {
              const status = getStudentStatus(student.id)
              const statusColor = getStatusColor(status)
              
              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-medium text-sm">
                        {student.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500">
                        Joined {new Date(student.joinedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                      {getStatusText(status)}
                    </span>
                    
                    <button
                      onClick={() => handleRemoveStudent(student.id, student.name)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Remove student"
                    >
                      <UserMinus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {currentPoll && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Current Poll: {currentPoll.question}</span>
            </div>
            <div className="text-gray-600">
              {currentPoll.responses?.length || 0}/{students.length} responses
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentsList