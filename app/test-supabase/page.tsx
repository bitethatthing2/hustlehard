'use client'

import { useEffect, useState } from 'react'
import { testSupabaseConnection } from '@/lib/supabase'

export default function TestSupabase() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    async function checkConnection() {
      try {
        const isConnected = await testSupabaseConnection()
        setConnectionStatus(isConnected ? 'success' : 'error')
      } catch (error) {
        setConnectionStatus('error')
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred')
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
        <div className="space-y-4">
          {connectionStatus === 'loading' && (
            <p className="text-blue-500">Testing connection...</p>
          )}
          {connectionStatus === 'success' && (
            <p className="text-green-500">✅ Successfully connected to Supabase!</p>
          )}
          {connectionStatus === 'error' && (
            <div className="text-red-500">
              <p>❌ Failed to connect to Supabase</p>
              {errorMessage && <p className="text-sm mt-2">{errorMessage}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 