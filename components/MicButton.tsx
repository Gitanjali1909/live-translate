'use client'
import { useAppStore } from '@/store/useAppStore'
import { motion } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'

export default function MicButton() {
  const { isRecording, setIsRecording, setTranscription, translateText, targetLanguage } = useAppStore()

  const handleClick = () => {
    if (isRecording) {
      setIsRecording(false)
      ;(window as any).recognition?.stop()
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) return
      const recognition = new SpeechRecognition()
      ;(window as any).recognition = recognition
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'auto'
      recognition.onresult = (e: any) => {
        let transcript = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) transcript += e.results[i][0].transcript
        }
        if (transcript.trim()) {
          setTranscription(transcript)
          translateText(transcript, targetLanguage)
        }
      }
      recognition.start()
      setIsRecording(true)
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      animate={{ scale: isRecording ? 1.2 : 1 }}
      className={`p-6 rounded-full ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white shadow-lg`}
    >
      {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
    </motion.button>
  )
}
