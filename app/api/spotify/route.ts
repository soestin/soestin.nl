import { NextResponse } from "next/server"

const USER_ID = "an0lpz8vewqhv7t0usp39ykdf"
const SPOTIFY_API_URL = `https://spotify.soest.in/user/${USER_ID}`

// This tells Next.js to revalidate the data every 5 seconds
export const revalidate = 5

interface SpotifyTrack {
  name: string
  artists: string[]
  album: {
    name: string
    images: Array<{ url: string; height: number; width: number }>
  }
  spotify_url: string
  duration_ms: number
}

interface SpotifyData {
  is_playing: boolean
  progress_ms: number
  progress_percent: number
  track?: SpotifyTrack
}

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

    const data = await externalResponse.json() as SpotifyData
    
    // Only return the essential data we need for the UI
    const essentialData = {
      is_playing: data.is_playing || false,
      progress_ms: data.progress_ms || 0,
      progress_percent: data.progress_percent || 0,
      track: data.track ? {
        name: data.track.name,
        artists: data.track.artists,
        album: {
          name: data.track.album.name,
          images: data.track.album.images?.slice(0, 1) || [] // Only need the first image
        },
        spotify_url: data.track.spotify_url,
        duration_ms: data.track.duration_ms
      } : null
    }
    
    return NextResponse.json(essentialData)
  } catch (error) {
    console.error("Spotify API Error:", error)
    return NextResponse.json({ message: "Failed to fetch Spotify data" }, { status: 500 })
  }
}
