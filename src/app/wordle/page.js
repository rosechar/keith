// app/wordle/page.js
'use client'
import { useState, useEffect } from 'react'
import { WordleGame } from './components/WordleGame'
import { puzzleData } from '@/data/wordle'

export default function Wordle() {
  // Initialize with the first puzzle as default
  const [currentPuzzle, setCurrentPuzzle] = useState(puzzleData[0])
  const [isLoaded, setIsLoaded] = useState(false)

  // Select random puzzle after initial render
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * puzzleData.length)
    setCurrentPuzzle(puzzleData[randomIndex])
    setIsLoaded(true)
  }, [])

  const startNewGame = () => {
    const remainingPuzzles = puzzleData.filter(puzzle => puzzle.id !== currentPuzzle.id)
    const randomIndex = Math.floor(Math.random() * remainingPuzzles.length)
    setCurrentPuzzle(remainingPuzzles[randomIndex])
  }

  // Show loading state until client-side code runs
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="animate-pulse">
          <h1 className="text-3xl font-bold mb-2">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900">
      <header className="text-center pt-8">
        <h1 className="text-3xl font-bold mb-2">Wordle</h1>
        <p className="text-gray-400">
          Solve puzzles based on moments we've shared together
        </p>
      </header>
      <WordleGame 
        puzzle={currentPuzzle}
        onGameComplete={startNewGame}
      />
    </div>
  )
}