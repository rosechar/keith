// app/timeline/components/EventModal.js
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'

export function EventModal({ event, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && event && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gray-900 rounded-t-3xl p-6"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full bg-gray-800/80
                       hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>

            {event.image && (
              <motion.div 
                className="relative w-full aspect-video rounded-lg overflow-hidden mb-4"
                layoutId={`image-${event.id}`}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p className="text-gray-400 mb-4">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-300">{event.description}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}