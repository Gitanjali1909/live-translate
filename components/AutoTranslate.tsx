'use client';
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function AutoTranslate() {
  const transcription = useAppStore((s) => s.transcription);
  const source = useAppStore((s) => s.sourceLanguage);
  const target = useAppStore((s) => s.targetLanguage);
  const translateText = useAppStore((s) => s.translateText);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (!transcription) return;
    timerRef.current = window.setTimeout(() => {
      translateText(transcription, source, target);
    }, 600); // debounce
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [transcription, source, target, translateText]);

  return null;
}
