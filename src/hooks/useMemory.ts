'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChatMessage, Memory } from '@/types'

const MEMORY_KEY = 'digibot101-memory'

const defaultMemory: Memory = {
  enabled: true,
  conversations: [],
  preferences: {},
  lastAssistant: 'ava'
}

export const useMemory = () => {
  const [memory, setMemory] = useState<Memory>(defaultMemory)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load memory from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MEMORY_KEY)
      if (stored) {
        const parsedMemory = JSON.parse(stored)
        // Convert timestamp strings back to Date objects
        parsedMemory.conversations = parsedMemory.conversations.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMemory(parsedMemory)
      }
    } catch (error) {
      console.error('Failed to load memory from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save memory to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return
    
    try {
      localStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
    } catch (error) {
      console.error('Failed to save memory to localStorage:', error)
    }
  }, [memory, isLoaded])

  const addMessage = useCallback((message: ChatMessage) => {
    if (!memory.enabled) return
    
    setMemory(prev => ({
      ...prev,
      conversations: [...prev.conversations, message]
    }))
  }, [memory.enabled])

  const clearConversations = useCallback(() => {
    setMemory(prev => ({
      ...prev,
      conversations: []
    }))
  }, [])

  const setLastAssistant = useCallback((assistant: 'ava' | 'matt') => {
    setMemory(prev => ({
      ...prev,
      lastAssistant: assistant
    }))
  }, [])

  const updatePreference = useCallback((key: string, value: any) => {
    setMemory(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }))
  }, [])

  const toggleMemory = useCallback(() => {
    setMemory(prev => ({
      ...prev,
      enabled: !prev.enabled
    }))
  }, [])

  const clearAllMemory = useCallback(() => {
    setMemory(defaultMemory)
    try {
      localStorage.removeItem(MEMORY_KEY)
    } catch (error) {
      console.error('Failed to clear memory from localStorage:', error)
    }
  }, [])

  const getRecentConversations = useCallback((limit: number = 10): ChatMessage[] => {
    return memory.conversations.slice(-limit)
  }, [memory.conversations])

  return {
    memory,
    isLoaded,
    addMessage,
    clearConversations,
    setLastAssistant,
    updatePreference,
    toggleMemory,
    clearAllMemory,
    getRecentConversations
  }
}