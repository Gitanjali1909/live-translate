'use client'
import { ReactNode, useRef, useEffect } from 'react'

export default function Card({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  })
  return (
    <div className="flex flex-col w-full h-80 p-4 rounded-lg bg-gray-900 text-white shadow overflow-y-auto" ref={ref}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  )
}
