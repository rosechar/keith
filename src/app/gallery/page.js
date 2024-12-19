'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { wrap } from 'popmotion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useImageDimensions } from '@/hooks/useImageDimensions'

export default function Gallery() {
  // Generate array of 20 sequential image paths following the pattern img1.jpeg, img2.jpeg, etc.
  const totalImages = 80
  const imagePaths = Array.from({ length: totalImages }, (_, i) => `/gallery/img${i + 1}.jpeg`)

  const [randomizedImages, setRandomizedImages] = useState([])
  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = wrap(0, randomizedImages.length, page)
  
  const currentImage = randomizedImages[imageIndex]
  const { isPortrait } = useImageDimensions(currentImage)

  // Randomize images on component mount
  useEffect(() => {
    const shuffleArray = (array) => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }
    setRandomizedImages(shuffleArray(imagePaths))
  }, [])

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection])
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  }

  return (
    <motion.div 
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`relative w-full ${
        isPortrait 
          ? 'h-[70vh] md:aspect-[3/2]'
          : 'aspect-[3/2]'
      }`}>
        {/* Desktop Navigation Arrows */}
        <div className="hidden md:block">
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-colors text-white"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-colors text-white"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x
              if (swipe < -10000) paginate(1)
              else if (swipe > 10000) paginate(-1)
            }}
            className="absolute w-full h-full"
          >
            <motion.div 
              className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800/50 backdrop-blur-sm"
              layoutId={`photo-${imageIndex}`}
            >
              {currentImage && (
                <Image
                  src={currentImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) calc(100vw - 2rem), 1200px"
                  className={`transition-opacity duration-500 ${
                    isPortrait ? 'object-contain' : 'object-cover'
                  }`}
                  priority={imageIndex === 0}
                  quality={85}
                />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}