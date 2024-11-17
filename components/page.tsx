"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Github, Mail, Bug, Book, Globe, Server } from 'lucide-react'
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { TechStackItem } from "./TechStackItem"
import Image from 'next/image'
import { TurnstileGateway } from './TurnstileGateway'

interface TechItem {
  name: string;
  icon: string;
  quote: string;
  category: 'language' | 'framework' | 'tool' | 'cloud';
}

const techStack: TechItem[] = [
  { name: 'TypeScript', icon: 'SiTypescript', quote: "JavaScript that scales.", category: 'language' },
  { name: 'JavaScript', icon: 'SiJavascript', quote: "The language of the web.", category: 'language' },
  { name: 'Python', icon: 'SiPython', quote: "Simple is better than complex.", category: 'language' },
  
  { name: 'React', icon: 'SiReact', quote: "Build once, run everywhere.", category: 'framework' },
  { name: 'Next.js', icon: 'SiNextdotjs', quote: "The React Framework for Production.", category: 'framework' },
  { name: 'Flask', icon: 'SiFlask', quote: "Web development, one drop at a time.", category: 'framework' },
  { name: 'Node.js', icon: 'SiNodedotjs', quote: "JavaScript everywhere.", category: 'framework' },
  
  { name: 'Git', icon: 'SiGit', quote: "Version control that doesn't drive you crazy.", category: 'tool' },
  { name: 'Docker', icon: 'SiDocker', quote: "Build, Ship, Run. Anywhere.", category: 'tool' },
  { name: 'Tailwind', icon: 'SiTailwindcss', quote: "Rapidly build modern websites.", category: 'tool' },
  
  { name: 'Cloudflare', icon: 'SiCloudflare', quote: "The Web Performance & Security Company.", category: 'cloud' },
  { name: 'Vercel', icon: 'SiVercel', quote: "Develop. Preview. Ship.", category: 'cloud' },
];

export function BlockPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const projects = [
    {
      title: "stuff-cdn",
      description: "My first CDN built with Cloudflare Workers 🎉",
      tags: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Cloudflare Workers", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" }
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
        github: "https://github.com/soestin/soestinnl",
        live: "https://soestin.nl"
      }
    },
    {
      title: "Coming Soon....",
      description: "Coming Soon....",
      tags: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }
      ],
      links: {
        github: "#",
        live: "#"
      }
    }
  ]

  // Add stagger effect for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  // Add smooth hover effect for cards
  const cardVariants = {
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  const [isVerified, setIsVerified] = useState(false)
  
  // Check if user was previously verified
  useEffect(() => {
    const verified = sessionStorage.getItem('turnstile-verified')
    if (verified === 'true') {
      setIsVerified(true)
    }
  }, [])

  const handleVerification = () => {
    setIsVerified(true)
    sessionStorage.setItem('turnstile-verified', 'true')
  }

  if (!isVerified) {
    return <TurnstileGateway onVerified={handleVerification} />
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#221F2E] text-white relative overflow-hidden">
      {/* Animated Background Waves */}
      <motion.div 
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="fixed inset-0"
            animate={{
              y: [0, 20, -20, 0],
              x: [0, 10, -10, 0],
              opacity: [0.50, 1, 0.50],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.8,
              times: [0, 0.33, 0.66, 1],
            }}
          >
            <svg
              className="fixed w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d={`M 0 ${45 + index * 10} Q 25 ${35 + index * 5} 50 ${45 + index * 10} T 100 ${45 + index * 10} V 100 H 0 Z`}
                fill={index === 1 ? 'rgba(241, 97, 0, 0.15)' : `rgba(241, 97, 0, ${0.05 + index * 0.02})`}
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
          <motion.div
            className="relative z-10 text-center w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 flex items-center justify-center gap-2"
              style={{ opacity, scale }}
            >
              Hey <span className="wave">👋</span> What&apos;s up?
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-4 text-gray-300 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              My name is Justin, and I&apos;m a 15-year-old student studying Systems Engineering from the Netherlands.
            </motion.p>
            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">About me</h2>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <motion.div
              className="bg-white/5 p-6 rounded-lg border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <Bug className="w-8 h-8 mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">Creating bugs</h3>
              <p className="text-gray-400">since 2019</p>
            </motion.div>
            <motion.div
              className="bg-white/5 p-6 rounded-lg border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <Book className="w-8 h-8 mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">Currently learning</h3>
              <p className="text-gray-400">TypeScript and React</p>
            </motion.div>
            <motion.div
              className="bg-white/5 p-6 rounded-lg border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <Server className="w-8 h-8 mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">Homelab Enthusiast</h3>
              <p className="text-gray-400">Self-hosting & server management</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Projects</h2>
          <div className="grid gap-6 sm:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: i * 0.15,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="bg-white/5 p-4 sm:p-6 rounded-lg border border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <div className="flex gap-2">
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Globe className="w-5 h-5" />
                    </motion.a>
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        className="py-12 sm:py-20 px-4 sm:px-6 bg-white/5 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Tech Stack</h2>
          
          {/* Languages */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Languages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStack
                .filter(tech => tech.category === 'language')
                .map(tech => (
                  <TechStackItem key={tech.name} tech={tech} />
                ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Frameworks</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStack
                .filter(tech => tech.category === 'framework')
                .map(tech => (
                  <TechStackItem key={tech.name} tech={tech} />
                ))}
            </div>
          </div>

          {/* Tools */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Tools</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStack
                .filter(tech => tech.category === 'tool')
                .map(tech => (
                  <TechStackItem key={tech.name} tech={tech} />
                ))}
            </div>
          </div>

          {/* Cloud */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Cloud</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {techStack
                .filter(tech => tech.category === 'cloud')
                .map(tech => (
                  <TechStackItem key={tech.name} tech={tech} />
                ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-12 sm:py-20 px-4 sm:px-6 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Contact me! 👋</h2>
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            <motion.a
              href="mailto:justin@soestin.nl"
              className="flex items-center gap-2 bg-white text-[#221F2E] hover:bg-gray-200 px-6 py-3 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              Email
            </motion.a>
            <motion.a
              href="https://github.com/soestin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[#221F2E] hover:bg-gray-200 px-6 py-3 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              GitHub
            </motion.a>
            <motion.a
              href="https://discord.com/users/769813729599553567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[#221F2E] hover:bg-gray-200 px-6 py-3 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src="/discord.svg"
                alt="Discord logo"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              Discord
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  )
}