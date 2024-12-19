// app/timeline/components/TimelineComponent.js
'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { TimelineBar } from './TimelineBar'
import { TimelineEvent } from './TimelineEvent'
import { EventModal } from './EventModal'
import { EventCard } from './EventCard'

export function TimelineComponent({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    if (isMobile) {
      setShowModal(true)
    } else {
      // Scroll to center the selected event
      const eventElement = document.getElementById(`event-${event.id}`)
      if (eventElement) {
        const container = scrollContainerRef.current
        const scrollLeft = eventElement.offsetLeft - (container.clientWidth / 2) + (eventElement.offsetWidth / 2)
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft)
      }
    }

    const container = scrollContainerRef.current
    if (container && !isMobile) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] md:mt-16">
      <TimelineBar />

      <div
        ref={scrollContainerRef}
        className='relative w-full h-full overflow-y-auto overflow-x-hidden md:overflow-x-auto md:overflow-y-hidden md:scroll-smooth md:snap-x md:nap-mandatory'
      >
        <div className={`
          relative min-h-full w-full md:h-full flex items-start px-16 
        `}>
          <div className='flex flex-col gap-12 md:flex-row md:gap-32 py-8'>
            {events.map((event) => (
              <div
                key={event.id}
                id={`event-${event.id}`}
                className={isMobile ? 'snap-center' : ''}
              >
                <TimelineEvent
                  event={event}
                  isSelected={selectedEvent?.id === event.id}
                  onClick={() => handleEventClick(event)}
                  isMobile={isMobile}
                />
                {!isMobile && selectedEvent?.id === event.id && (
                  <EventCard 
                    event={selectedEvent}
                    position={scrollPosition}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isMobile && (
        <EventModal
          event={selectedEvent}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}