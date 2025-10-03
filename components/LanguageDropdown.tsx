'use client'
import { useAppStore } from '@/store/useAppStore'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
]

export default function LanguageDropdown() {
  const { targetLanguage, setTargetLanguage } = useAppStore()
  return (
    <select
      value={targetLanguage}
      onChange={(e) => setTargetLanguage(e.target.value)}
      className="p-2 rounded bg-gray-800 text-white"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  )
}
