'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Counter from './components/Counter'
import { RelationshipCounter } from './components/RelationshipCounter'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  }

  const cards = [
    { title: 'Gallery', icon: '📸', href: '/gallery', color: 'from-indigo-500 to-blue-600' },
    { title: 'Timeline', icon: '⏳', href: '/timeline', color: 'from-pink-500 to-rose-600' },
    { title: 'Wordle', icon: '🎁', href: '/wordle', color: 'from-green-500 to-emerald-600' },
    { title: 'Chat With Me', icon: '💭', href: '/chat', color: 'from-purple-500 to-violet-600' }
  ]

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 gap-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="text-center ">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">For Keith ❤️</h1>
        <p className="text-lg md:text-xl text-gray-300">Our story, memories, and moments together</p>
      </motion.div>

      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 w-full max-w-3xl"
        variants={containerVariants}
      >
        {cards.map((card, index) => (
          <motion.div key={card.href} variants={itemVariants}>
            <Link href={card.href}>
              <motion.div 
                className={`bg-gradient-to-r ${card.color} p-4 md:p-8 rounded-xl shadow-lg 
                           flex flex-col items-center justify-center gap-2 md:gap-4 
                           h-32 md:h-48 cursor-pointer backdrop-blur-sm bg-opacity-90`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span className="text-2xl md:text-4xl">{card.icon}</span>
                <h2 className="text-base md:text-xl font-semibold">{card.title}</h2>
              </motion.div>
            </Link>
          </motion.div>
        ))}
        
      </motion.div>
      <motion.div        
        className='text-center'
        variants={itemVariants}
 >
      <h2 className="text-2xl text-gray-400 mb-2">Since</h2>
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          October 13, 2023
        </div>
      </motion.div>

      <RelationshipCounter />
    </motion.div>
  )
}