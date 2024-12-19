// app/timeline/page.js
'use client'
import { motion } from 'framer-motion'
import { TimelineComponent } from './components/TimelineComponent'
import { timelineEvents } from '@/data/timeline'

export default function Timeline() {
  return (
    <motion.div 
      className="min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">Our Story</h1>
        <p className="text-gray-400">{"Moments we've shared together ❤️"}</p>
      </div>
      <TimelineComponent events={timelineEvents} />
    </motion.div>
  )
}