'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export function BackButton() {
  const pathname = usePathname()
  
  // Don't show the button on the homepage
  if (pathname === '/') return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link 
        href="/"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
      >
        <ChevronLeft size={20} />
      </Link>
    </motion.div>
  )
}