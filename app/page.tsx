"use client"
import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Index = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [translation, setTranslation] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [showTargetDropdown, setShowTargetDropdown] = useState(false)

  const transcriptionRef = useRef<HTMLTextAreaElement>(null)
  const translationRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
    { code: "hi", name: "Hindi" },
  ]

  const selectedTargetLang =
    languages.find(l => l.code === targetLanguage)?.name || "Spanish"

  useEffect(() => {
    if (transcriptionRef.current) {
      transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight
    }
  }, [transcription])

  useEffect(() => {
    if (translationRef.current) {
      translationRef.current.scrollTop = translationRef.current.scrollHeight
    }
  }, [translation])

  useEffect(() => {
    if (transcription.trim()) {
      translateText(transcription, targetLanguage)
    } else {
      setTranslation("")
    }
  }, [transcription, targetLanguage])

  const toggleRecording = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.")
      return
    }

    if (!isRecording) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " "
          }
        }
        if (finalTranscript) {
          setTranscription(prev => (prev ? prev + " " : "") + finalTranscript)
        }
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognition.start()
      recognitionRef.current = recognition
      setIsRecording(true)
    } else {
      recognitionRef.current?.stop()
      setIsRecording(false)
    }
  }

  const translateText = async (text: string, target: string) => {
  try {
    const chunks = text.match(/.{1,500}/g) || [] // split text every 500 chars
    let translated = ""
    for (const chunk of chunks) {
      // Indirect, through your Next.js backend
const res = await fetch("/api/translate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    q: chunk,
    source: "en",
    target: target,
    format: "text"
  }),
});
const data = await res.json();
translated += (data.translation || "") + " ";
    }
    setTranslation(translated.trim())
  } catch {
    setTranslation("Translation failed")
  }
}


  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700/20" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Live Translate
          </h1>
          <p className="text-gray-400 text-lg">
            Speak or type, translate instantly
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <motion.button
            onClick={toggleRecording}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={
              isRecording
                ? {
                    boxShadow: [
                      "0 0 20px hsl(191 100% 50% / 0.5)",
                      "0 0 40px hsl(191 100% 50% / 0.8)",
                      "0 0 20px hsl(191 100% 50% / 0.5)",
                    ],
                  }
                : {}
            }
            transition={isRecording ? { duration: 2, repeat: Infinity } : {}}
            className={`w-24 h-24 rounded-full transition-colors duration-300 flex items-center justify-center ${
              isRecording ? "bg-red-600" : "bg-blue-600 shadow-neon"
            }`}
          >
            {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ borderColor: "hsl(191 100% 50% / 0.5)" }}
            className="backdrop-blur-sm bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-neon"
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Original</h2>
              <textarea
                ref={transcriptionRef}
                value={transcription}
                onChange={e => setTranscription(e.target.value)}
                placeholder="Speak or type text here..."
                className="w-full min-h-[300px] max-h-[400px] overflow-y-auto bg-gray-900/50 rounded-lg p-4 border border-gray-700 resize-none outline-none leading-relaxed text-white"
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ borderColor: "hsl(270 60% 60% / 0.5)" }}
            className="backdrop-blur-sm bg-gradient-to-br from-purple-800 via-pink-800 to-red-800 border border-gray-700/30 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_hsl(270_60%_60%/0.3)]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Translation</h2>
                <div className="relative">
                  <button
                    onClick={() => setShowTargetDropdown(!showTargetDropdown)}
                    className="w-[140px] bg-gray-900/50 border border-gray-700/50 rounded-lg px-3 py-2 text-sm flex items-center justify-between hover:border-purple-500 transition-colors"
                  >
                    <span>{selectedTargetLang}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {showTargetDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-[140px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
                      >
                        {languages.map(lang => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setTargetLanguage(lang.code)
                              setShowTargetDropdown(false)
                            }}
                            className="w-full px-3 py-2 text-sm text-left hover:bg-gray-700 transition-colors"
                          >
                            {lang.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div
                ref={translationRef}
                className="min-h-[300px] max-h-[400px] overflow-y-auto bg-gray-900/50 rounded-lg p-4 border border-gray-700/20 text-white"
              >
                {translation || <span className="text-gray-400 italic">Translation will appear here...</span>}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-3 flex items-center gap-3 shadow-neon"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 bg-red-600 rounded-full"
              />
              <span className="text-sm font-medium">Recording...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Index
