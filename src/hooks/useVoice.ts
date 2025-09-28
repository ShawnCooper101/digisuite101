'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { VoiceAssistant } from '@/types'
import { findBestVoiceForAssistant } from '@/utils/voiceAssistants'

interface UseVoiceReturn {
  isListening: boolean
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
  speak: (text: string, assistant: VoiceAssistant) => Promise<void>
  isSpeaking: boolean
  error: string | null
}

export const useVoice = (): UseVoiceReturn => {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech synthesis ref
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Check for browser support
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const supported = !!(SpeechRecognition && window.speechSynthesis)
    
    setIsSupported(supported)
    
    if (supported && SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'
    }
  }, [])

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) {
      setError('Speech recognition not supported')
      return
    }

    try {
      setError(null)
      setIsListening(true)
      recognitionRef.current.start()
    } catch (err) {
      setError('Failed to start speech recognition')
      setIsListening(false)
    }
  }, [isSupported])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [])

  const speak = useCallback(async (text: string, assistant: VoiceAssistant): Promise<void> => {
    if (!isSupported || !synthRef.current) {
      setError('Speech synthesis not supported')
      return
    }

    try {
      setError(null)
      setIsSpeaking(true)

      // Cancel any ongoing speech
      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      
      // Find the best voice for this assistant
      const voice = await findBestVoiceForAssistant(assistant)
      if (voice) {
        utterance.voice = voice
      }

      // Apply voice settings
      utterance.pitch = assistant.voiceSettings.pitch
      utterance.rate = assistant.voiceSettings.rate
      utterance.volume = assistant.voiceSettings.volume

      // Handle speech events
      utterance.onend = () => {
        setIsSpeaking(false)
      }

      utterance.onerror = (event) => {
        setError(`Speech synthesis error: ${event.error}`)
        setIsSpeaking(false)
      }

      synthRef.current.speak(utterance)
    } catch (err) {
      setError('Failed to synthesize speech')
      setIsSpeaking(false)
    }
  }, [isSupported])

  // Setup speech recognition event handlers
  useEffect(() => {
    if (!recognitionRef.current) return

    const recognition = recognitionRef.current

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      // Dispatch custom event with the transcript
      window.dispatchEvent(new CustomEvent('speechRecognitionResult', { 
        detail: { transcript } 
      }))
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`)
      setIsListening(false)
    }

    return () => {
      recognition.onresult = null
      recognition.onend = null
      recognition.onerror = null
    }
  }, [])

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    speak,
    isSpeaking,
    error
  }
}