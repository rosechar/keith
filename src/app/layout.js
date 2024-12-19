import { Inter } from 'next/font/google'
import './globals.css'
import { BackButton } from './components/BackButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'For Keith ❤️',
  description: 'A special gift for a special person',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white`}>
        <BackButton />
        {children}
      </body>
    </html>
  )
}