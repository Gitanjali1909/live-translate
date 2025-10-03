import { create } from 'zustand'

interface AppState {
  isRecording: boolean
  transcription: string
  translation: string
  targetLanguage: string
  setIsRecording: (v: boolean) => void
  setTranscription: (v: string) => void
  setTranslation: (v: string) => void
  setTargetLanguage: (v: string) => void
  translateText: (text: string, targetLang: string) => Promise<void>
}

export const useAppStore = create<AppState>((set) => ({
  isRecording: false,
  transcription: '',
  translation: '',
  targetLanguage: 'en',
  setIsRecording: (v) => set({ isRecording: v }),
  setTranscription: (v) => set({ transcription: v }),
  setTranslation: (v) => set({ translation: v }),
  setTargetLanguage: (v) => set({ targetLanguage: v }),
  translateText: async (text, targetLang) => {
    if (!text.trim()) return
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=auto|${targetLang}`
    )
    const data = await res.json()
    set({ translation: data.responseData.translatedText || '' })
  },
}))
