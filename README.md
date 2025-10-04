# Live Translate

[Live Demo](https://live-translation-blond.vercel.app/)

Live Translate is a web app that converts speech or typed text into another language in real-time. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion, it provides a smooth, dark-themed interface with live transcription and translation.

## Features

- **Live Speech-to-Text**: Speak into your mic and see your words transcribed instantly.
- **Editable Original Text**: Type or edit text manually in the original box and get live translations.
- **Multiple Languages**: Translate text into Spanish, French, German, Italian, Portuguese, Japanese, Chinese, and Hindi.
- **Clean UI & Smooth Animations**: Framer Motion animations for mic button and live updates.
- **Dark-Themed Interface**: Modern dark mode with gradients and polished design.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Speech Recognition**: Browser Web Speech API
- **Translation**: LibreTranslate API (free)
- **State Management**: React `useState` and `useRef`

## Getting Started

```bash
# 1. Clone the repo
git clone git@github.com:Gitanjali1909/live-translate.git
cd live-translate

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# 4. Open in browser
http://localhost:3000
