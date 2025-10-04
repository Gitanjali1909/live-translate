import { create } from "zustand"

type LanguageCode = "auto" | "en" | "es" | "fr" | "de" | "it" | "pt" | "ja" | "zh" | "hi"

interface AppState {
  sourceLanguage: LanguageCode
  targetLanguage: LanguageCode
  isRecording: boolean
  transcription: string
  translation: string
  setSourceLanguage: (v: LanguageCode) => void
  setTargetLanguage: (v: LanguageCode) => void
  setIsRecording: (v: boolean) => void
  setTranscription: (v: string) => void
  setTranslation: (v: string) => void
  translateText: (text: string, targetLang: LanguageCode) => Promise<void>
}

export const useAppStore = create<AppState>((set) => ({
  sourceLanguage: "auto",
  targetLanguage: "en",
  isRecording: false,
  transcription: "",
  translation: "",
  setSourceLanguage: (v) => set({ sourceLanguage: v }),
  setTargetLanguage: (v) => set({ targetLanguage: v }),
  setIsRecording: (v) => set({ isRecording: v }),
  setTranscription: (v) => set({ transcription: v }),
  setTranslation: (v) => set({ translation: v }),
  translateText: async (text, targetLang) => {
    if (!text.trim()) return
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=auto|${targetLang}`
      )
      const data: { responseData?: { translatedText?: string } } = await res.json()
      set({ translation: data.responseData?.translatedText || "" })
    } catch {
      set({ translation: "Translation failed" })
    }
  },
}))
