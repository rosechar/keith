// app/timeline/components/TimelineEvent.js
'use client'
import { motion } from 'framer-motion'

export function TimelineEvent({ event, isSelected, onClick }) {
  const Icon = event.icon
  
  return (
    <motion.div
      className="relative w-full md:w-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      <button
        onClick={onClick}
        className="group relative focus:outline-none"
      >
        {/* Connector line */}
        <motion.div
          className={`absolute bg-purple-500/50
            w-full h-0.5 -left-8 top-1/2
            md:w-0.5 ${isSelected ? 'md:h-16' : 'md:h-9'} md:left-1/2 md:top-[100%]`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className={`
            relative w-12 h-12 rounded-full
            flex items-center justify-center
            ${isSelected ? 'bg-purple-600 scale-110' : 'bg-gray-800'}
            group-hover:bg-purple-500
            transition-all duration-200
            ${event.isImportant ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-gray-900' : ''}
          `}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>

        <div className="
          absolute text-sm text-gray-400
          left-16 top-1/2 -translate-y-1/2
          md:left-1/2 md:top-[-24px] md:-translate-y-0 md:-translate-x-1/2 md:whitespace-nowrap
        ">
          {new Date(event.date).toLocaleDateString()}
        </div>
      </button>
    </motion.div>
  )
}