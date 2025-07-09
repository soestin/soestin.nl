"use client"

import { Github, Mail, Coffee } from 'lucide-react'
import { SiDiscord } from "react-icons/si"
import { SpotifyNowPlaying } from "./SpotifyNowPlaying"
import { ThreeBackground } from "./ThreeBackground"

export function LightPage() {
  return (
    <div className="min-h-screen bg-[#221F2E] text-white relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Subtle Background Wave */}
      <div className="fixed inset-0 z-10">
        <svg
          className="fixed w-full h-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 50 Q 25 30 50 50 T 100 50 V 100 H 0 Z"
            fill="rgba(241, 97, 0, 0.05)"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 max-w-2xl mx-auto pt-8">
        
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight relative">
            <span className="relative">
              hey, i'm{' '}
              <span className="text-orange-400 relative inline-block name-glow cursor-pointer">
                Justin
              </span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            just a 15-year-old who likes to code stuff
          </p>
          <p className="text-lg text-gray-400 mt-4 font-light">
            studying systems engineering in the Netherlands
          </p>
        </div>

        {/* What I'm up to */}
        <div className="w-full space-y-6 mb-16">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
            <h3 className="text-gray-300 font-medium mb-3">what I'm working on</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              mostly backend stuff using Cloudflare Workers, 
              building APIs, CDNs, and diving deep into serverless & distributed systems
            </p>
            
            <div className="space-y-3">

            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/[0.07] transition-all duration-300">
            <h3 className="text-gray-300 font-medium mb-3">things I love using</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-orange-400/20 rounded-full text-sm text-orange-300 border border-orange-400/30">Cloudflare Workers</span>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300 border border-blue-500/30">TypeScript</span>
              <span className="px-3 py-1 bg-orange-400/15 rounded-full text-sm text-orange-200 border border-orange-400/25">Cloudflare R2</span>
              <span className="px-3 py-1 bg-blue-600/20 rounded-full text-sm text-blue-200 border border-blue-600/30">Docker</span>
              <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-300 border border-green-500/30">D1 Database</span>
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30">Wrangler</span>
            </div>
          </div>

          {/* Subtle Spotify section */}
          <div className="bg-white/3 backdrop-blur-sm p-4 rounded-xl border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Coffee className="w-4 h-4 text-orange-400 opacity-70" />
              <span className="text-gray-400 text-sm">currently vibing to</span>
            </div>
            <SpotifyNowPlaying />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex gap-4 mb-8">
          <a
            href="mailto:justin@soestin.nl"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </a>
          <a
            href="https://github.com/soestin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
          <a
            href="https://discord.com/users/769813729599553567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <SiDiscord className="w-4 h-4" />
            <span className="text-sm">Discord</span>
          </a>
        </div>

        {/* Footer note */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm font-light">
            keeping it simple, one line of code at a time
          </p>
          <p className="text-gray-600 text-xs font-light">
            © {new Date().getFullYear()} Justin • Netherlands
          </p>
        </div>
      </div>
    </div>
  )
}
