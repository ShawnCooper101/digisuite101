import { VoiceAssistant } from '@/types'

export const VOICE_ASSISTANTS: Record<'ava' | 'matt', VoiceAssistant> = {
  ava: {
    id: 'ava',
    name: 'ava',
    displayName: 'Ava Skye',
    description: 'Professional voice assistant with a warm, engaging personality',
    voiceSettings: {
      pitch: 1.2,
      rate: 0.9,
      volume: 1.0,
      voiceName: 'Microsoft Zira Desktop' // Fallback to first available female voice
    },
    personality: 'Professional, warm, and engaging with a focus on business success',
    avatar: '👩‍💼',
    color: 'from-pink-400 to-purple-500'
  },
  matt: {
    id: 'matt',
    name: 'matt',
    displayName: 'Matt',
    description: 'Confident and warm voice assistant ideal for presentations',
    voiceSettings: {
      pitch: 0.8,
      rate: 0.85,
      volume: 1.0,
      voiceName: 'Microsoft David Desktop' // Fallback to first available male voice
    },
    personality: 'Confident, warm, and authoritative with excellent presentation skills',
    avatar: '👨‍💼',
    color: 'from-blue-400 to-cyan-500'
  }
}

export const getAvailableVoices = async (): Promise<SpeechSynthesisVoice[]> => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return []
  }
  
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
    } else {
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices())
      }
    }
  })
}

export const findBestVoiceForAssistant = async (assistant: VoiceAssistant): Promise<SpeechSynthesisVoice | null> => {
  const voices = await getAvailableVoices()
  
  // Try to find the preferred voice
  let voice = voices.find(v => v.name.includes(assistant.voiceSettings.voiceName || ''))
  
  if (!voice) {
    // Fallback to gender-appropriate voice
    if (assistant.id === 'ava') {
      voice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('hazel') ||
        v.name.toLowerCase().includes('susan')
      ) || voices.find(v => v.name.toLowerCase().includes('woman'))
    } else {
      voice = voices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('mark') ||
        v.name.toLowerCase().includes('george')
      ) || voices.find(v => v.name.toLowerCase().includes('man'))
    }
  }
  
  // Final fallback to first available voice of appropriate gender
  if (!voice) {
    voice = voices.find(v => assistant.id === 'ava' ? !v.name.includes('male') : v.name.includes('male'))
  }
  
  return voice || voices[0] || null
}