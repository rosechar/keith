'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SendHorizontal } from 'lucide-react'
import { Message } from './Message'
import { TypingIndicator } from './TypingIndicator'

export function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = {
      role: "user",
      content: inputMessage
    }

    // Add user message to chat
    setMessages(prev => [...prev, { ...newMessage, isUser: true }])
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage].map(({ role, content }) => ({ role, content }))
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.message.content,
        isUser: false
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I'm having trouble responding right now 😕",
        isUser: false
      }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white/5 rounded-lg backdrop-blur-sm shadow-lg">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <Message 
              key={index} 
              content={message.content} 
              isUser={message.isUser}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            disabled={!inputMessage.trim() || isTyping}
          >
            <SendHorizontal size={24} />
          </button>
        </form>
      </div>
    </div>
  )
}