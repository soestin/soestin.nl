"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Github, Mail, Bug, Book, Globe, Server } from 'lucide-react'
import Link from "next/link"
import { TechStackItem } from "./TechStackItem"
import { SpotifyNowPlaying } from "./SpotifyNowPlaying"
import Image from 'next/image'

interface TechItem {
  name: string;
  icon: string;
  quote: string;
  category: 'frontend' | 'backend' | 'devops';
}

const techStack: TechItem[] = [
  // Frontend
  { name: 'TypeScript', icon: 'SiTypescript', quote: "JavaScript that scales.", category: 'frontend' },
  { name: 'JavaScript', icon: 'SiJavascript', quote: "The language of the web.", category: 'frontend' },
  { name: 'React', icon: 'SiReact', quote: "Build once, run everywhere.", category: 'frontend' },
  { name: 'Next.js', icon: 'SiNextdotjs', quote: "The React Framework for Production.", category: 'frontend' },
  { name: 'Tailwind', icon: 'SiTailwindcss', quote: "Rapidly build modern websites.", category: 'frontend' },

  // Backend
  { name: 'Python', icon: 'SiPython', quote: "Simple is better than complex.", category: 'backend' },
  { name: 'Flask', icon: 'SiFlask', quote: "Web development, one drop at a time.", category: 'backend' },
  { name: 'Node.js', icon: 'SiNodedotjs', quote: "JavaScript everywhere.", category: 'backend' },

  // DevOps
  { name: 'Git', icon: 'SiGit', quote: "Version control that doesn't drive you crazy.", category: 'devops' },
  { name: 'GitHub', icon: 'SiGithub', quote: "Where the world builds software.", category: 'devops' },
  { name: 'Docker', icon: 'SiDocker', quote: "Build, Ship, Run. Anywhere.", category: 'devops' },
  { name: 'Cloudflare', icon: 'SiCloudflare', quote: "The Web Performance & Security Company.", category: 'devops' },
  { name: 'Vercel', icon: 'SiVercel', quote: "Develop. Preview. Ship.", category: 'devops' },
  { name: 'Hetzner', icon: 'SiHetzner', quote: "High-performance hosting. Unbeatable prices.", category: 'devops' },
  { name: 'Linux', icon: 'SiLinux', quote: "The open-source operating system.", category: 'devops' },
  { name: 'GCP', icon: 'SiGooglecloud', quote: "Innovate faster with Google's cloud infrastructure.", category: 'devops' },
];

export function LightPage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Hide the arrow when user scrolls down more than 100px
      setShowScrollIndicator(scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    {
      title: "stuff-cdn",
      description: "My first CDN built with Cloudflare Workers 🎉",
      tags: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Cloudflare Workers", icon: "/cloudflare-workers.svg" }
      ],
      links: {
        github: "https://github.com/soestin/stuff-cdn",
        live: "https://cdn.soestin.nl"
      }
    },
    {
      title: "This Website!",
      description: "My personal website built for fun and as simple expandable portfolio.",
      tags: [
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Tailwind CSS", icon: "https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/tailwindcss/tailwindcss-original.svg" }
      ],
      links: {
        github: "https://github.com/soestin/soestin.nl",
        live: "https://soestin.nl"
      }
    },
    {
      title: "Obsidian Web Sync",
      description: "A handy tool to publish your obsidian notes via R2",
      tags: [
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Cloudflare R2", icon: "/cloudflare-r2.svg" },
        { name: "Cloudflare Workers", icon: "/cloudflare-workers.svg" }
      ],
      links: {
        github: "https://github.com/soestin/Obsidian-Web-Sync-R2",
        live: "#"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-[#221F2E] text-white relative overflow-hidden">
      {/* Static Background */}
      <div className="fixed inset-0 z-0">
        <svg
          className="fixed w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 45 Q 25 35 50 45 T 100 45 V 100 H 0 Z"
            fill="rgba(241, 97, 0, 0.1)"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
          <div className="relative z-10 text-center w-full max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 flex items-center justify-center gap-2">
              Hey <span className="wave">👋</span> What&apos;s up?
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 text-gray-300 px-4">
              My name is Justin, and I&apos;m a 15-year-old student studying Systems Engineering from the Netherlands.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="#contact"
                className="bg-white text-[#221F2E] hover:bg-gray-200 px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Simple Scroll Indicator */}
            {showScrollIndicator && (
              <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-300">
                <ArrowRight className="w-6 h-6 text-gray-300 rotate-90" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">About me</h2>
          
          {/* Spotify Now Playing */}
          <div className="mb-8">
            <SpotifyNowPlaying />
          </div>
          
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <Bug className="w-8 h-8 mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">Creating bugs</h3>
              <p className="text-gray-400">since 2019</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <Book className="w-8 h-8 mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">Currently learning</h3>
              <p className="text-gray-400">TypeScript and React</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <Server className="w-8 h-8 mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">Homelab Enthusiast</h3>
              <p className="text-gray-400">Self-hosting & server management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Projects</h2>
          <div className="grid gap-6 sm:gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-white/5 p-4 sm:p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <div className="flex gap-2">
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={typeof tag === 'string' ? tag : tag.name} 
                      className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2"
                    >
                      {typeof tag === 'object' && tag.icon && (
                        <Image 
                          src={tag.icon} 
                          alt={`${tag.name} icon`} 
                          width={16} 
                          height={16} 
                          className="w-4 h-4" 
                        />
                      )}
                      {typeof tag === 'string' ? tag : tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Tech Stack</h2>
          
          {/* Languages */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Frontend</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStack
                .filter(tech => tech.category === 'frontend')
                .map(tech => (
                  <TechStackItem key={tech.name} tech={tech} />
                ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Backend</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStack
                .filter(tech => tech.category === 'backend')
                .map(tech => (
                  <TechStackItem key={tech.name} tech={tech} />
                ))}
            </div>
          </div>

          {/* Cloud */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Cloud and DevOps</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStack
                .filter(tech => tech.category === 'devops')
                .map(tech => (
                  <TechStackItem key={tech.name} tech={tech} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Contact me! 👋</h2>
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            <a
              href="mailto:justin@soestin.nl"
              className="flex items-center gap-2 bg-white text-[#221F2E] hover:bg-gray-200 px-6 py-3 rounded-full transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
            <a
              href="https://github.com/soestin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[#221F2E] hover:bg-gray-200 px-6 py-3 rounded-full transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://discord.com/users/769813729599553567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[#221F2E] hover:bg-gray-200 px-6 py-3 rounded-full transition-colors"
            >
              <Image 
                src="/discord.svg"
                alt="Discord logo"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
