"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GatewayProps {
  onVerified: () => void;
}

export function TurnstileGateway({ onVerified }: GatewayProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize turnstile when component mounts
    if (typeof window !== 'undefined') {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#221F2E] flex items-center justify-center p-4">
      <motion.div 
        className="bg-white/5 p-8 rounded-lg border border-white/10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl text-white font-bold mb-6">Welcome to my portfolio</h1>
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div
            className="cf-turnstile"
            data-sitekey="0x4AAAAAAA0QM_dtzxafaUOW"
            data-theme="dark"
            data-callback={onVerified}
          />
        )}
      </motion.div>
    </div>
  )
} 