import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../context/SocketContext'
import { toggleChat } from '../store/slices/chatSlice'
import { MessageCircle, Send, X, User, Users } from 'lucide-react'

const Chat = () => {
  const dispatch = useDispatch()
  const { sendMessage } = useSocket()
  const { messages, isOpen } = useSelector((state) => state.chat)
  const { role, name } = useSelector((state) => state.user)
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      sendMessage(message.trim())
      setMessage('')
    }
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => dispatch(toggleChat())}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => dispatch(toggleChat())}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Popup */}
      <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 chat-popup z-40">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-500 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="font-medium">Chat</h3>
          </div>
          <button
            onClick={() => dispatch(toggleChat())}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm">No messages yet</p>
              <p className="text-xs">Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2 ${
                  (role === 'teacher' && msg.senderType === 'teacher') ||
                  (role === 'student' && msg.senderName === name)
                    ? 'flex-row-reverse space-x-reverse'
                    : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    msg.senderType === 'teacher'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {msg.senderType === 'teacher' ? (
                      <Users className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                  </div>
                </div>
                <div className={`flex-1 min-w-0 ${
                  (role === 'teacher' && msg.senderType === 'teacher') ||
                  (role === 'student' && msg.senderName === name)
                    ? 'text-right'
                    : ''
                }`}>
                  <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                    (role === 'teacher' && msg.senderType === 'teacher') ||
                    (role === 'student' && msg.senderName === name)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="font-medium text-xs opacity-75 mb-1">
                      {msg.senderName}
                    </p>
                    <p>{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Chat