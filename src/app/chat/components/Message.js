'use client'
import { motion } from 'framer-motion'

export function Message({ content, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-2 
          ${isUser 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-200 text-gray-900'
          }
        `}
      >
        {content}
      </div>
    </motion.div>
  )
}