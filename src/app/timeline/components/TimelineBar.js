// app/timeline/components/TimelineBar.js
'use client'
import { motion } from 'framer-motion'

export function TimelineBar() {
  return (
    <motion.div
      className='fixed z-10 left-8 top-[8rem] bottom-8 w-1  md:top-1/3 md:h-1 md:w-[93vw]
        bg-gradient-to-b md:bg-gradient-to-r 
        from-indigo-500 via-purple-500 to-pink-500
        rounded-full '
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  )
}