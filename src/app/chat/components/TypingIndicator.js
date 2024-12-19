'use client'
import { motion } from 'framer-motion'

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-200 rounded-2xl px-4 py-2">
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-500 rounded-full"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}