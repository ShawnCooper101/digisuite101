'use client'

import React from 'react'
import { VOICE_ASSISTANTS } from '@/utils/voiceAssistants'

interface FloatingBubbleProps {
  currentAssistant: 'ava' | 'matt'
  isListening: boolean
  isProcessing: boolean
  onClick: () => void
  onMouseDown: (e: React.MouseEvent) => void
  isDragging: boolean
}

export const FloatingBubble: React.FC<FloatingBubbleProps> = ({
  currentAssistant,
  isListening,
  isProcessing,
  onClick,
  onMouseDown,
  isDragging
}) => {
  const assistant = VOICE_ASSISTANTS[currentAssistant]
  
  const getStatusColor = () => {
    if (isListening) return 'from-green-400 to-emerald-500 pulse-glow'
    if (isProcessing) return 'from-yellow-400 to-orange-500 animate-pulse'
    return `bg-gradient-to-r ${assistant.color}`
  }

  const getStatusText = () => {
    if (isListening) return 'Listening...'
    if (isProcessing) return 'Processing...'
    return `${assistant.displayName} Ready`
  }

  return (
    <div
      className={`
        relative group cursor-pointer select-none
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab hover:cursor-pointer'}
      `}
      onClick={onClick}
      onMouseDown={onMouseDown}
      title={getStatusText()}
    >
      {/* Main bubble */}
      <div
        className={`
          w-16 h-16 rounded-full shadow-lg transition-all duration-300
          flex items-center justify-center text-2xl
          ${getStatusColor()}
          ${isDragging ? 'scale-110' : 'hover:scale-110'}
          ${isListening || isProcessing ? 'animate-bounce-slow' : ''}
        `}
      >
        {assistant.avatar}
      </div>

      {/* Status indicator */}
      <div
        className={`
          absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white
          flex items-center justify-center transition-all duration-300
          ${isListening ? 'bg-green-500' : isProcessing ? 'bg-yellow-500' : 'bg-blue-500'}
        `}
      >
        {isListening ? (
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        ) : isProcessing ? (
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
        ) : (
          <div className="w-2 h-2 bg-white rounded-full" />
        )}
      </div>

      {/* Hover tooltip */}
      <div
        className={`
          absolute bottom-full right-0 mb-2 px-3 py-1 
          bg-gray-800 text-white text-sm rounded-lg
          whitespace-nowrap opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
          ${isDragging ? 'hidden' : ''}
        `}
      >
        {getStatusText()}
        <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
      </div>

      {/* Pulsing ring when active */}
      {(isListening || isProcessing) && (
        <div
          className={`
            absolute inset-0 rounded-full border-2 
            ${isListening ? 'border-green-400' : 'border-yellow-400'}
            animate-ping opacity-30
          `}
        />
      )}
    </div>
  )
}