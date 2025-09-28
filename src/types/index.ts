export interface VoiceAssistant {
  id: 'ava' | 'matt'
  name: string
  displayName: string
  description: string
  voiceSettings: {
    pitch: number
    rate: number
    volume: number
    voiceName?: string
  }
  personality: string
  avatar: string
  color: string
}

export interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  assistant?: 'ava' | 'matt'
}

export interface WidgetState {
  isExpanded: boolean
  isListening: boolean
  isProcessing: boolean
  currentAssistant: 'ava' | 'matt'
  position: { x: number; y: number }
  isDragging: boolean
}

export interface VoiceSettings {
  isEnabled: boolean
  speechRecognition: boolean
  textToSpeech: boolean
  voiceActivation: boolean
}

export interface Memory {
  enabled: boolean
  conversations: ChatMessage[]
  preferences: Record<string, any>
  lastAssistant: 'ava' | 'matt'
}