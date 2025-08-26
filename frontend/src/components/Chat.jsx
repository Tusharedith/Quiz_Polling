import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSocket } from '../context/SocketContext'
import { toggleChat } from '../store/slices/chatSlice'
import { MessageCircle, Send, X, User, Users, Sparkles, Zap } from 'lucide-react'

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
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 border border-white/20 backdrop-blur-sm group"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
          {messages.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{messages.length > 9 ? '9+' : messages.length}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping opacity-75"></div>
        </div>
      </button>
    )
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => dispatch(toggleChat())}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 border border-white/20 backdrop-blur-sm group"
      >
        <div className="relative">
          <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
          <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping opacity-75"></div>
        </div>
      </button>

      {/* Chat Popup */}
      <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 z-40 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Live Chat</h3>
                <p className="text-white/70 text-sm">Connect with everyone</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleChat())}
              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:rotate-90 border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Animated background elements in header */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-t-3xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-400/10 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 h-80 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <div className="text-center text-white/60 mt-16">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/10">
                  <MessageCircle className="w-8 h-8 text-white/40" />
                </div>
                <div className="absolute inset-0 bg-purple-400/10 rounded-full animate-ping mx-auto w-16 h-16"></div>
              </div>
              <h4 className="text-lg font-semibold text-white/80 mb-2">No messages yet</h4>
              <p className="text-sm text-white/50">Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isOwn = (role === 'teacher' && msg.senderType === 'teacher') ||
                           (role === 'student' && msg.senderName === name)
              
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${
                    isOwn ? 'flex-row-reverse space-x-reverse' : ''
                  } animate-in slide-in-from-bottom duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      msg.senderType === 'teacher'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-400/30'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400/30'
                    } shadow-lg`}>
                      {msg.senderType === 'teacher' ? (
                        <Users className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <div className={`flex-1 min-w-0 ${isOwn ? 'text-right' : ''}`}>
                    <div className={`inline-block px-4 py-3 rounded-2xl text-sm max-w-xs shadow-lg backdrop-blur-sm border ${
                      isOwn
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400/30'
                        : 'bg-white/10 text-white border-white/20'
                    }`}>
                      <p className="font-semibold text-xs opacity-80 mb-1">
                        {msg.senderName}
                        {msg.senderType === 'teacher' && (
                          <span className="ml-1">👑</span>
                        )}
                      </p>
                      <p className="leading-relaxed">{msg.message}</p>
                    </div>
                    <p className={`text-xs text-white/50 mt-2 ${isOwn ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10 bg-black/10 backdrop-blur-sm">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // prevent newline
                    handleSubmit(e);    // call your send function
                  }
                }}
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 text-white placeholder-white/50 text-sm transition-all duration-300"
                maxLength={500}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-white/40">
                {message.length}/500
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-400/30 group"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
