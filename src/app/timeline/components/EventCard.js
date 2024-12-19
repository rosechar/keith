// app/timeline/components/EventCard.js
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function EventCard({ event }) {
  return (
    <motion.div
      className="w-96
                 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {event.image && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-400 text-sm mb-3">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-gray-300">{event.description}</p>
    </motion.div>
  )
}