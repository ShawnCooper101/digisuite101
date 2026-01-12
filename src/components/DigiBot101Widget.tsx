'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { WidgetState, ChatMessage } from '@/types'
import { VOICE_ASSISTANTS } from '@/utils/voiceAssistants'
import { useVoice } from '@/hooks/useVoice'
import { useMemory } from '@/hooks/useMemory'
import { FloatingBubble } from './FloatingBubble'
import { AssistantPanel } from './AssistantPanel'

export const DigiBot101Widget: React.FC = () => {
  const [widgetState, setWidgetState] = useState<WidgetState>({
    isExpanded: false,
    isListening: false,
    isProcessing: false,
    currentAssistant: 'ava',
    position: { x: 0, y: 0 },
    isDragging: false
  })

  const { 
    isListening, 
    isSupported, 
    startListening, 
    stopListening, 
    speak, 
    isSpeaking, 
    error: voiceError 
  } = useVoice()

  const { 
    memory, 
    isLoaded, 
    addMessage, 
    setLastAssistant, 
    getRecentConversations 
  } = useMemory()

  const widgetRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number }>({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  })

  // Load last used assistant from memory
  useEffect(() => {
    if (isLoaded && memory.lastAssistant) {
      setWidgetState(prev => ({
        ...prev,
        currentAssistant: memory.lastAssistant
      }))
    }
  }, [isLoaded, memory.lastAssistant])

  // Listen for speech recognition results
  useEffect(() => {
    const handleSpeechResult = (event: CustomEvent) => {
      const transcript = event.detail.transcript
      if (transcript) {
        handleUserMessage(transcript, true)
      }
    }

    window.addEventListener('speechRecognitionResult', handleSpeechResult as EventListener)
    return () => {
      window.removeEventListener('speechRecognitionResult', handleSpeechResult as EventListener)
    }
  }, [])

  // Update widget state when voice state changes
  useEffect(() => {
    setWidgetState(prev => ({
      ...prev,
      isListening: isListening,
      isProcessing: isSpeaking
    }))
  }, [isListening, isSpeaking])

  const toggleExpanded = useCallback(() => {
    setWidgetState(prev => ({
      ...prev,
      isExpanded: !prev.isExpanded
    }))
  }, [])

  const switchAssistant = useCallback((assistantId: 'ava' | 'matt') => {
    setWidgetState(prev => ({
      ...prev,
      currentAssistant: assistantId
    }))
    setLastAssistant(assistantId)
  }, [setLastAssistant])

  const handleUserMessage = useCallback(async (text: string, isVoice: boolean = false) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    }
    addMessage(userMessage)

    // Generate AI response
    setWidgetState(prev => ({ ...prev, isProcessing: true }))
    
    try {
      const response = await generateAIResponse(text, widgetState.currentAssistant)
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
        assistant: widgetState.currentAssistant
      }
      addMessage(aiMessage)

      // Speak the response if voice is supported
      if (isVoice && isSupported) {
        const assistant = VOICE_ASSISTANTS[widgetState.currentAssistant]
        await speak(response, assistant)
      }
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
        assistant: widgetState.currentAssistant
      }
      addMessage(errorMessage)
    } finally {
      setWidgetState(prev => ({ ...prev, isProcessing: false }))
    }
  }, [widgetState.currentAssistant, addMessage, speak, isSupported])

  const handleVoiceToggle = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  // Drag functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (widgetState.isExpanded) return // Don't drag when expanded
    
    e.preventDefault()
    const rect = widgetRef.current?.getBoundingClientRect()
    if (rect) {
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top
      }
      setWidgetState(prev => ({ ...prev, isDragging: true }))
    }
  }, [widgetState.isExpanded])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!widgetState.isDragging) return
    
    const newX = e.clientX - dragRef.current.offsetX
    const newY = e.clientY - dragRef.current.offsetY
    
    setWidgetState(prev => ({
      ...prev,
      position: { x: newX, y: newY }
    }))
  }, [widgetState.isDragging])

  const handleMouseUp = useCallback(() => {
    setWidgetState(prev => ({ ...prev, isDragging: false }))
  }, [])

  useEffect(() => {
    if (widgetState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [widgetState.isDragging, handleMouseMove, handleMouseUp])

  if (!isLoaded) {
    return null // Don't render until memory is loaded
  }

  return (
    <div
      ref={widgetRef}
      className={`floating-widget ${
        widgetState.isExpanded ? 'widget-expanded' : 'widget-minimized'
      }`}
      style={
        !widgetState.isExpanded && (widgetState.position.x !== 0 || widgetState.position.y !== 0)
          ? {
              right: 'auto',
              bottom: 'auto',
              left: widgetState.position.x,
              top: widgetState.position.y
            }
          : {}
      }
    >
      {widgetState.isExpanded ? (
        <AssistantPanel
          isExpanded={widgetState.isExpanded}
          currentAssistant={widgetState.currentAssistant}
          isListening={widgetState.isListening}
          isProcessing={widgetState.isProcessing}
          conversations={getRecentConversations(50)}
          onClose={toggleExpanded}
          onSwitchAssistant={switchAssistant}
          onSendMessage={handleUserMessage}
          onVoiceToggle={handleVoiceToggle}
          voiceSupported={isSupported}
          voiceError={voiceError}
        />
      ) : (
        <FloatingBubble
          currentAssistant={widgetState.currentAssistant}
          isListening={widgetState.isListening}
          isProcessing={widgetState.isProcessing}
          onClick={toggleExpanded}
          onMouseDown={handleMouseDown}
          isDragging={widgetState.isDragging}
        />
      )}
    </div>
  )
}

// Simple AI response generator (to be replaced with actual API integration)
async function generateAIResponse(userMessage: string, assistant: 'ava' | 'matt'): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
  
  const assistantData = VOICE_ASSISTANTS[assistant]
  const responses = [
    `Hi! I'm ${assistantData.displayName}. I'd be happy to help you with your digital marketing needs. What specific area would you like to focus on?`,
    `That's a great question! As your AI assistant, I can help you with email marketing, social media strategies, SEO optimization, and funnel building. What interests you most?`,
    `I understand you're looking for marketing solutions. Let me help you create a comprehensive strategy that drives results. What's your primary business goal?`,
    `Excellent! I can assist with ad creation, trend research, and automation strategies. Would you like me to analyze your current marketing approach?`,
    `Perfect! I'm here to help optimize your digital presence. Whether it's Google Trends analysis or Meta Ads management, I've got you covered. What's your next priority?`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}