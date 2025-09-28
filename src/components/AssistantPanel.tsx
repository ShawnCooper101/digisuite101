'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '@/types'
import { VOICE_ASSISTANTS } from '@/utils/voiceAssistants'

interface AssistantPanelProps {
  isExpanded: boolean
  currentAssistant: 'ava' | 'matt'
  isListening: boolean
  isProcessing: boolean
  conversations: ChatMessage[]
  onClose: () => void
  onSwitchAssistant: (assistant: 'ava' | 'matt') => void
  onSendMessage: (message: string, isVoice?: boolean) => void
  onVoiceToggle: () => void
  voiceSupported: boolean
  voiceError: string | null
}

export const AssistantPanel: React.FC<AssistantPanelProps> = ({
  isExpanded,
  currentAssistant,
  isListening,
  isProcessing,
  conversations,
  onClose,
  onSwitchAssistant,
  onSendMessage,
  onVoiceToggle,
  voiceSupported,
  voiceError
}) => {
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const assistant = VOICE_ASSISTANTS[currentAssistant]
  const otherAssistant = currentAssistant === 'ava' ? 'matt' : 'ava'

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations])

  // Focus input when panel opens
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isExpanded])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim() && !isProcessing) {
      onSendMessage(inputText.trim(), false)
      setInputText('')
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${assistant.color} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{assistant.avatar}</div>
            <div>
              <h3 className="font-semibold text-lg">{assistant.displayName}</h3>
              <p className="text-sm opacity-90">{assistant.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            title="Minimize"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        {/* Assistant switcher */}
        <div className="mt-3 flex space-x-2">
          <button
            onClick={() => onSwitchAssistant('ava')}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              currentAssistant === 'ava'
                ? 'bg-white text-purple-600 font-semibold'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            👩‍💼 Ava Skye
          </button>
          <button
            onClick={() => onSwitchAssistant('matt')}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              currentAssistant === 'matt'
                ? 'bg-white text-blue-600 font-semibold'
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            👨‍💼 Matt
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {conversations.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-4xl mb-4">{assistant.avatar}</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Welcome to DigiBot101!
            </h4>
            <p className="text-sm">
              Hi! I'm {assistant.displayName}. I'm here to help you with digital marketing, 
              automation, and business growth. Ask me anything or use the microphone to speak with me.
            </p>
          </div>
        ) : (
          conversations.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : `bg-white shadow-md border-l-4 ${
                        message.assistant === 'ava' 
                          ? 'border-purple-400' 
                          : 'border-blue-400'
                      }`
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        
        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white shadow-md rounded-lg px-4 py-2 border-l-4 border-gray-300">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-500">{assistant.displayName} is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Voice error display */}
      {voiceError && (
        <div className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-sm">
          Voice Error: {voiceError}
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Type a message to ${assistant.displayName}...`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isProcessing}
          />
          
          {/* Voice button */}
          {voiceSupported && (
            <button
              type="button"
              onClick={onVoiceToggle}
              className={`px-3 py-2 rounded-lg transition-all ${
                isListening
                  ? 'bg-green-500 text-white pulse-glow'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          )}
          
          {/* Send button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}