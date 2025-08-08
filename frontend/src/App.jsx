import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Welcome from './components/Welcome'
import TeacherDashboard from './components/TeacherDashboard'
import StudentDashboard from './components/StudentDashboard'
import { SocketProvider } from './context/SocketContext'

function App() {
  return (
    <SocketProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </SocketProvider>
  )
}

export default App