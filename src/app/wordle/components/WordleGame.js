// app/wordle/components/WordleGame.js
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GameBoard } from './GameBoard'
import { GameKeyboard } from './GameKeyboard'
import { HintDisplay } from './HintDisplay'
import { NewGameButton } from './NewGameButton'

export function WordleGame({ puzzle, onGameComplete }) {
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [showAdditionalHint, setShowAdditionalHint] = useState(false)
  const [gameState, setGameState] = useState('playing') // playing, won, lost

  // Reset game state when puzzle changes
  useEffect(() => {
    setGuesses([])
    setCurrentGuess('')
    setShowAdditionalHint(false)
    setGameState('playing')
  }, [puzzle])

  useEffect(() => {
    const handleKeydown = (e) => {
      if (gameState !== 'playing') return
      
      if (e.key === 'Enter' && currentGuess.length === puzzle.word.length) {
        handleSubmitGuess()
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1))
      } else if (currentGuess.length < puzzle.word.length && /^[A-Z]$/i.test(e.key)) {
        setCurrentGuess(prev => prev + e.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [currentGuess, gameState, puzzle.word.length])

  const handleSubmitGuess = () => {
    const newGuesses = [...guesses, currentGuess]
    setGuesses(newGuesses)
    setCurrentGuess('')

    if (currentGuess === puzzle.word) {
      setGameState('won')
    } else if (newGuesses.length >= 6) {
      setGameState('lost')
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto p-4">
      <HintDisplay 
        hint={puzzle.hint}
        additionalHint={showAdditionalHint ? puzzle.additionalHint : null}
        onRequestHint={() => setShowAdditionalHint(true)}
      />

      <GameBoard 
        word={puzzle.word}
        guesses={guesses}
        currentGuess={currentGuess}
      />

      {gameState === 'playing' && (
        <GameKeyboard 
          onKeyPress={(key) => {
            if (currentGuess.length < puzzle.word.length) {
              setCurrentGuess(prev => prev + key)
            }
          }}
          onEnter={handleSubmitGuess}
          onBackspace={() => setCurrentGuess(prev => prev.slice(0, -1))}
          guesses={guesses}
          word={puzzle.word}
        />
      )}

      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mt-8"
          >
            <p className="text-2xl font-bold mb-4">
              {gameState === 'won' ? puzzle.successMessage : `The word was ${puzzle.word}`}
            </p>
            <NewGameButton onClick={onGameComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}