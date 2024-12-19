// app/wordle/components/GameKeyboard.js
'use client'
import { motion } from 'framer-motion'

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←']
]

export function GameKeyboard({ onKeyPress, onEnter, onBackspace, guesses, word }) {
  // Track the "best" state for each letter across all guesses
  const getKeyState = (key) => {
    let state = 'unused' // possible states: unused, wrong, present, correct

    guesses.forEach(guess => {
      guess.split('').forEach((letter, index) => {
        if (letter === key) {
          if (word[index] === key) {
            state = 'correct' // Once correct, always correct
          } else if (word.includes(key) && state !== 'correct') {
            state = 'present' // Present can be overridden by correct
          } else if (state === 'unused') {
            state = 'wrong' // Wrong only if no better state found
          }
        }
      })
    })

    return state
  }

  const getKeyBackground = (state) => {
    switch (state) {
      case 'correct': return 'bg-[#538d4e] hover:bg-[#538d4e]/80'
      case 'present': return 'bg-[#b59f3b] hover:bg-[#b59f3b]/80'
      case 'wrong': return 'bg-[#3a3a3c] hover:bg-[#3a3a3c]/80'
      default: return 'bg-[#818384] hover:bg-[#818384]/80'
    }
  }

  return (
    <div className="grid gap-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map(key => {
            const state = getKeyState(key)
            
            return (
              <motion.button
                key={key}
                onClick={() => {
                  if (key === 'Enter') onEnter()
                  else if (key === '←') onBackspace()
                  else onKeyPress(key)
                }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-3 py-4 rounded-sm font-medium text-sm
                  transition-colors
                  ${key.length > 1 ? 'px-4' : ''}
                  ${getKeyBackground(state)}
                  text-white
                `}
              >
                {key}
              </motion.button>
            )
          })}
        </div>
      ))}
    </div>
  )
}