"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Music, PauseCircle } from "lucide-react"

// Define TypeScript types for the Spotify data
interface SpotifyImage {
  height: number
  url: string
  width: number
}

interface Album {
  name: string
  images: SpotifyImage[]
}

interface Track {
  name: string
  artists: string[]
  album: Album
  spotify_url: string
  duration_ms: number
}

interface SpotifyData {
  is_playing: boolean
  track: Track
  progress_ms: number
  progress_percent: number
}

// Liquid progress bar component
function LiquidProgress({ value, isPlaying }: { value: number; isPlaying: boolean }) {
  return (
    <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
      <div 
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ 
          width: `${Math.max(0, Math.min(100, value))}%`,
          background: isPlaying 
            ? 'linear-gradient(90deg, #f16100, #ff8c42, #f16100)' 
            : 'rgba(255, 255, 255, 0.5)',
          backgroundSize: '200% 100%',
          animation: isPlaying ? 'liquidFlow 3s ease-in-out infinite' : 'none',
          transition: 'width 0.1s linear'
        }}
      />
      <style jsx>{`
        @keyframes liquidFlow {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }
      `}</style>
    </div>
  )
}

const SPOTIFY_API_URL = `/api/spotify`

export function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentProgress, setCurrentProgress] = useState(0)
  const lastUpdateTime = useRef<number>(Date.now())
  const animationFrameId = useRef<number | undefined>(undefined)

  // Smooth progress interpolation
  useEffect(() => {
    if (!data?.is_playing || !data?.track?.duration_ms) {
      // Stop animation when not playing
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = undefined
      }
      return
    }

    const animate = () => {
      const now = Date.now()
      const timeDelta = now - lastUpdateTime.current
      
      if (data.is_playing && timeDelta > 0) {
        // Calculate expected progress advancement per frame
        const progressPerMs = 100 / data.track.duration_ms
        const expectedProgressDelta = timeDelta * progressPerMs
        
        setCurrentProgress(prev => {
          const newProgress = prev + expectedProgressDelta
          return Math.min(newProgress, 100) // Don't exceed 100%
        })
      }
      
      lastUpdateTime.current = now
      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Start animation if not already running
    if (!animationFrameId.current) {
      lastUpdateTime.current = Date.now()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = undefined
      }
    }
  }, [data?.is_playing, data?.track?.duration_ms])

  // Sync with server data when it arrives (smooth correction)
  useEffect(() => {
    if (data?.progress_percent !== undefined) {
      const serverProgress = data.progress_percent
      
      // If we're very close to server progress, sync exactly
      if (Math.abs(serverProgress - currentProgress) < 2) {
        setCurrentProgress(serverProgress)
      } else {
        // If there's a bigger difference, smoothly correct over time
        const correctionFactor = 0.3
        setCurrentProgress(prev => 
          prev + (serverProgress - prev) * correctionFactor
        )
      }
      
      lastUpdateTime.current = Date.now()
    }
  }, [data?.progress_percent, currentProgress])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(SPOTIFY_API_URL)
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`)
        }
        const json: SpotifyData = await res.json()
        setData(json)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000) // Refresh every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-white/5 border-white/10 text-white">
        <div className="flex items-center space-x-4 p-4">
          <div className="w-16 h-16 bg-white/10 rounded animate-pulse" />
          <div className="flex-1">
            <div className="h-5 bg-white/10 rounded animate-pulse mb-2" />
            <div className="h-4 bg-white/10 rounded animate-pulse w-3/4 mb-2" />
            <div className="h-2 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-white/5 border-white/10 text-white">
        <div className="flex items-center justify-center p-4 text-red-400">
          <p>Error: {error}</p>
        </div>
      </Card>
    )
  }

  if (!data || !data.is_playing || !data.track) {
    return (
      <Card className="bg-white/5 border-white/10 text-white">
        <div className="flex items-center space-x-4 p-4">
          <div className="w-16 h-16 bg-white/10 rounded flex items-center justify-center">
            <PauseCircle className="w-8 h-8 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-300">Not Currently Playing</p>
            <p className="text-sm text-gray-500">Spotify</p>
          </div>
        </div>
      </Card>
    )
  }

  const { track } = data
  const imageUrl = track.album.images[0]?.url

  return (
    <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
      <div className="flex items-center space-x-4 p-4">
        {/* Album Art */}
        <Link
          href={track.spotify_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 transition-transform hover:scale-105"
        >
          <div className="relative w-16 h-16 rounded overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`Album art for ${track.album.name}`}
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-white/10">
                <Music className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </Link>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <Link
            href={track.spotify_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-orange-400 transition-colors"
          >
            <h3 className="font-bold truncate text-lg" title={track.name}>
              {track.name}
            </h3>
            <p className="text-white/80 truncate" title={track.artists.join(", ")}>
              {track.artists.join(", ")}
            </p>
          </Link>
          
          {/* Liquid Progress Bar */}
          <div className="mt-3 w-full">
            <LiquidProgress value={currentProgress} isPlaying={data.is_playing} />
          </div>
        </div>
      </div>
    </Card>
  )
}
