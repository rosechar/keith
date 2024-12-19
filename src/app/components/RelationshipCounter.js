'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function RelationshipCounter() {
  // Initialize state for current time and update every second
  const [now, setNow] = useState(new Date())
  const startDate = new Date('2023-10-13')

  useEffect(() => {
    // Create interval to update time every second
    const timer = setInterval(() => setNow(new Date()), 1000)
    // Cleanup interval on component unmount
    return () => clearInterval(timer)
  }, [])

  // Calculate all time differences from start date
  const diff = now.getTime() - startDate.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)
  const remainingDays = days % 365
  const months = Math.floor(remainingDays / 30)
  const finalDays = remainingDays % 30
  const currentSeconds = seconds % 60
  const currentMinutes = minutes % 60
  const currentHours = hours % 24

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto py-6 text-center flex flex-col gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header section with start date */}
      <motion.div 
        variants={itemVariants}
      >
        <h2 className="text-2xl text-gray-400 mb-2">Together since</h2>
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          October 13, 2023
        </div>
      </motion.div>

      {/* Total counts display */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'MONTHS', value: Math.floor(days / 30) },
          { label: 'DAYS', value: days },
          { label: 'MINUTES', value: minutes },
          { label: 'SECONDS', value: seconds }
        ].map(({ label, value }) => (
          <motion.div
            key={label}
            className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur 
                       rounded-xl p-6 flex flex-col items-center justify-center"
          >
            <div className="text-purple-400 text-sm mb-2">{label}</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-2xl font-bold font-mono"
              >
                {value.toLocaleString()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
            {/* Main duration display */}
            <motion.div 
        variants={itemVariants}
        className="text-3xl md:text-5xl font-bold flex flex-col gap-4"
      >
        <AnimatePresence mode="wait">
        <div className="text-2xl text-purple-400 mt-4 font-normal">
          {"That's..."}
        </div>
          <motion.div
            key={`${years}${months}${finalDays}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {years > 0 && `${years} ${years === 1 ? 'Year' : 'Years'} `}
            {months > 0 && `${months} ${months === 1 ? 'Month' : 'Months'} `}
            {finalDays} {finalDays === 1 ? 'Day' : 'Days'}
          </motion.div>
        </AnimatePresence>
        <div className="text-2xl text-purple-400 font-normal">
          and counting...
        </div>
      </motion.div>

      {/* Current time units display */}
      <motion.div 
        variants={itemVariants}
        className="text-xl space-y-3"
      >
        {[
          { label: 'Hours', value: currentHours },
          { label: 'Minutes', value: currentMinutes },
          { label: 'Seconds', value: currentSeconds }
        ].map(({ label, value }) => (
          <AnimatePresence mode="wait" key={label}>
            <motion.div
              key={value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center space-x-3"
            >
              <span className="text-right font-mono">
                {value.toString().padStart(2, '0')}
              </span>
              <span className="text-gray-400">{label}</span>
            </motion.div>
          </AnimatePresence>
        ))}
      </motion.div>
    </motion.div>
  )
}