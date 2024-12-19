'use client'
import { motion } from 'framer-motion'
import { ChatInterface } from './components/ChatInterface'

export default function Chat() {
  return (
    <motion.div 
      className="flex flex-col h-screen max-w-2xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header section with bottom border */}
      <div className="text-center mb-6 pb-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold mb-2">Chat with me!</h1>
        <p className="text-gray-400">{"I'll respond just like in our texts 😊"}</p>
      </div>

      {/* Chat interface fills remaining height */}
      <div className="flex-1">
        <ChatInterface />
      </div>
    </motion.div>
  )
}