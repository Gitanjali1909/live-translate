import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Live Speech-to-Text Translator",
  description: "Speech recognition with live translation"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
