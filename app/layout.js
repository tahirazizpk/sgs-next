import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create SGS Product App',
  description: 'SGS Product order page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}