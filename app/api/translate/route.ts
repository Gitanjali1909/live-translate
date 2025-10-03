import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { q, source, target } = await req.json();
  if (!q || !target)
    return NextResponse.json({ error: "Missing params" }, { status: 400 });

  const googleKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  try {
    if (googleKey) {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${googleKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q, source, target }),
      });
      const data = await res.json();
      const translated =
        data?.data?.translations?.[0]?.translatedText ?? "Translation failed";
      return NextResponse.json({ translation: translated });
    } else {
      const encoded = encodeURIComponent(q);
      const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=${source}|${target}`;
      const res = await fetch(url);
      const data = await res.json();
      const translated =
        data?.responseData?.translatedText ?? "Translation failed";
      return NextResponse.json({ translation: translated });
    }
  } catch (e) {
    console.error("Translation API error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
