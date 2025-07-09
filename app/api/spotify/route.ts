import { NextResponse } from "next/server"

const USER_ID = "an0lpz8vewqhv7t0usp39ykdf"
const SPOTIFY_API_URL = `https://spotify.soest.in/user/${USER_ID}`

// This tells Next.js to revalidate the data every 5 seconds
export const revalidate = 5

export async function GET() {
  try {
    const externalResponse = await fetch(SPOTIFY_API_URL, {
      // Use Next.js's extended fetch for caching control
      next: { revalidate: 5 },
    })

    // The external API returns 204 when nothing is playing.
    // We'll return a consistent JSON response to our client.
    if (externalResponse.status === 204 || externalResponse.status > 400) {
      return NextResponse.json({ is_playing: false })
    }

    const data = await externalResponse.json()
    console.log("Spotify API Response:", JSON.stringify(data, null, 2))
    return NextResponse.json(data)
  } catch (error) {
    console.error("Spotify API Error:", error)
    return NextResponse.json({ message: "Failed to fetch Spotify data" }, { status: 500 })
  }
}
