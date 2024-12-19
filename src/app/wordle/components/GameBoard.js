// app/wordle/components/GameBoard.js
'use client'
import { motion } from 'framer-motion'

export function GameBoard({ word, guesses, currentGuess }) {
  const wordLength = word.length
  // Create a dynamic grid template based on word length
  const gridTemplateColumns = `repeat(${wordLength}, minmax(0, 1fr))`

  return (
    <div className="grid gap-2 mb-8">
      {Array(6).fill(null).map((_, rowIndex) => (
        <div 
          key={rowIndex} 
          className="grid gap-2"
          // Apply dynamic grid template
          style={{ gridTemplateColumns }}
        >
          {Array(wordLength).fill(null).map((_, colIndex) => {
            const letter = guesses[rowIndex]?.[colIndex] || 
                          (rowIndex === guesses.length ? currentGuess[colIndex] : '')
            
            const isRevealed = rowIndex < guesses.length
            const isCorrect = isRevealed && word[colIndex] === letter
            const isPresent = isRevealed && !isCorrect && word.includes(letter)

            return (
              <motion.div
                key={colIndex}
                initial={isRevealed ? { rotateX: -90 } : false}
                animate={{ 
                  rotateX: 0,
                  backgroundColor: isRevealed
                    ? isCorrect 
                      ? '#538d4e' // Wordle green
                      : isPresent
                        ? '#b59f3b' // Wordle yellow
                        : '#3a3a3c' // Wordle dark gray
                    : '#121213' // Wordle background gray
                }}
                transition={{ 
                  delay: colIndex * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className={`
                  aspect-square rounded-sm flex items-center justify-center
                  text-2xl font-bold border-2 uppercase
                  ${letter ? 'border-gray-600' : 'border-[#3a3a3c]'}
                `}
              >
                {letter}
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}