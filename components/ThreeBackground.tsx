"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameId = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!mountRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Adjust animation settings based on accessibility preference
    const animationConfig = {
      particleSpeed: prefersReducedMotion ? 0.002 : 0.008,
      particleCount: prefersReducedMotion ? 50 : 150,
      shapeCount: prefersReducedMotion ? 5 : 15,
      rotationSpeed: prefersReducedMotion ? 0.001 : 0.003,
      waveIntensity: prefersReducedMotion ? 0.005 : 0.02,
      cameraMovement: prefersReducedMotion ? 0.1 : 0.8,
      enableComplexMotion: !prefersReducedMotion
    }

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0) // Transparent background
    mountRef.current.appendChild(renderer.domElement)

    // Create floating particles with more variety
    const particleCount = animationConfig.particleCount
    const particles = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const velocities: number[] = []
    const originalPositions: number[] = []
    const phases: number[] = []

    for (let i = 0; i < particleCount * 3; i += 3) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40
      
      positions[i] = x
      positions[i + 1] = y
      positions[i + 2] = z
      
      // Store original positions for wave animation
      originalPositions.push(x, y, z)
      
      // Store velocities for each particle (reduced for accessibility)
      const velocityMultiplier = prefersReducedMotion ? 0.01 : 0.04
      velocities.push((Math.random() - 0.5) * velocityMultiplier) // x velocity
      velocities.push((Math.random() - 0.5) * velocityMultiplier) // y velocity
      velocities.push((Math.random() - 0.5) * velocityMultiplier) // z velocity
      
      // Random phase for each particle
      phases.push(Math.random() * Math.PI * 2)
      
      // Color variation (orange to purple spectrum) - simplified for reduced motion
      const colorVariation = Math.random()
      if (prefersReducedMotion || colorVariation < 0.8) {
        // Mostly orange tones for reduced motion
        colors[i] = 0.94 + Math.random() * 0.06     // R
        colors[i + 1] = 0.38 + Math.random() * 0.2  // G
        colors[i + 2] = 0.0 + Math.random() * 0.1   // B
      } else {
        // Purple tones
        colors[i] = 0.6 + Math.random() * 0.3       // R
        colors[i + 1] = 0.1 + Math.random() * 0.2   // G
        colors[i + 2] = 0.7 + Math.random() * 0.3   // B
      }
      
      // Varied sizes
      sizes[i / 3] = 0.1 + Math.random() * 0.3
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Enhanced material for particles with vertex colors
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      vertexColors: true
    })

    const particleSystem = new THREE.Points(particles, particleMaterial)
    scene.add(particleSystem)

    // Add more varied floating geometric shapes (reduced for accessibility)
    const geometries = [
      new THREE.RingGeometry(0.5, 0.8, 8),
      new THREE.CircleGeometry(0.4, 12),
      new THREE.PlaneGeometry(0.6, 0.6),
      new THREE.ConeGeometry(0.3, 0.8, 6),
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.5)
    ]
    
    const shapes: THREE.Mesh[] = []
    const shapeVelocities: { x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number }[] = []
    
    for (let i = 0; i < animationConfig.shapeCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = new THREE.MeshBasicMaterial({
        color: prefersReducedMotion ? 0xf16100 : (Math.random() < 0.7 ? 0xf16100 : 0x8b5cf6),
        transparent: true,
        opacity: prefersReducedMotion ? 0.05 : (0.08 + Math.random() * 0.12),
        wireframe: prefersReducedMotion ? true : (Math.random() < 0.6)
      })
      
      const shape = new THREE.Mesh(geometry, material)
      
      shape.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35
      )
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      
      // Store individual velocities for each shape (reduced for accessibility)
      const velocityMultiplier = prefersReducedMotion ? 0.005 : 0.02
      const rotationMultiplier = prefersReducedMotion ? 0.005 : 0.02
      
      shapeVelocities.push({
        x: (Math.random() - 0.5) * velocityMultiplier,
        y: (Math.random() - 0.5) * velocityMultiplier,
        z: (Math.random() - 0.5) * velocityMultiplier,
        rotX: (Math.random() - 0.5) * rotationMultiplier,
        rotY: (Math.random() - 0.5) * (rotationMultiplier * 1.5),
        rotZ: (Math.random() - 0.5) * rotationMultiplier
      })
      
      shapes.push(shape)
      scene.add(shape)
    }

    // Position camera
    camera.position.z = 10

    // Animation loop with enhanced effects (accessibility-aware)
    let time = 0
    const animate = () => {
      frameId.current = requestAnimationFrame(animate)
      time += animationConfig.particleSpeed

      // Update particle positions with complex motion patterns
      const positions = particleSystem.geometry.attributes.position.array as Float32Array
      const colors = particleSystem.geometry.attributes.color.array as Float32Array
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        const index = i / 3
        const originalX = originalPositions[i]
        const originalY = originalPositions[i + 1]
        const originalZ = originalPositions[i + 2]
        const phase = phases[index]
        
        if (animationConfig.enableComplexMotion) {
          // Complex swirling motion (full animation)
          const swirl = time + phase
          const radius = 2 + Math.sin(time * 0.3 + phase) * 1
          
          // Add flowing movement with swirl pattern
          positions[i] += velocities[i] + Math.cos(swirl) * animationConfig.waveIntensity
          positions[i + 1] += velocities[i + 1] + Math.sin(swirl) * animationConfig.waveIntensity
          positions[i + 2] += velocities[i + 2]
          
          // Add multi-layered wave motion
          positions[i] += Math.sin(time * 1.2 + originalY * 0.1) * 0.015
          positions[i + 1] += Math.cos(time * 0.8 + originalX * 0.1) * animationConfig.waveIntensity
          positions[i + 2] += Math.sin(time * 0.6 + originalZ * 0.1 + phase) * 0.01
          
          // Add orbital motion for some particles
          if (index % 3 === 0) {
            const orbit = time * 0.5 + phase
            positions[i] += Math.cos(orbit) * radius * 0.01
            positions[i + 1] += Math.sin(orbit) * radius * 0.01
          }

          // Dynamic color shifting
          const colorShift = Math.sin(time * 0.5 + phase) * 0.1
          if (index % 5 === 0) {
            colors[i] = Math.min(1, colors[i] + colorShift)
            colors[i + 2] = Math.min(1, colors[i + 2] + colorShift * 0.5)
          }
        } else {
          // Simplified motion for reduced motion preference
          positions[i] += velocities[i]
          positions[i + 1] += velocities[i + 1]
          positions[i + 2] += velocities[i + 2]
          
          // Simple gentle wave
          positions[i] += Math.sin(time + originalY * 0.05) * animationConfig.waveIntensity
          positions[i + 1] += Math.cos(time + originalX * 0.05) * animationConfig.waveIntensity
        }

        // Wrap around screen with larger bounds
        if (positions[i] > 20) positions[i] = -20
        if (positions[i] < -20) positions[i] = 20
        if (positions[i + 1] > 20) positions[i + 1] = -20
        if (positions[i + 1] < -20) positions[i + 1] = 20
        if (positions[i + 2] > 20) positions[i + 2] = -20
        if (positions[i + 2] < -20) positions[i + 2] = 20
      }

      particleSystem.geometry.attributes.position.needsUpdate = true
      if (animationConfig.enableComplexMotion) {
        particleSystem.geometry.attributes.color.needsUpdate = true
      }

      // Enhanced shape animations with individual behaviors (accessibility-aware)
      shapes.forEach((shape, index) => {
        const velocity = shapeVelocities[index]
        
        if (animationConfig.enableComplexMotion) {
          // Full animation mode
          shape.rotation.x += velocity.rotX + Math.sin(time + index) * 0.005
          shape.rotation.y += velocity.rotY + Math.cos(time * 0.7 + index) * 0.008
          shape.rotation.z += velocity.rotZ + Math.sin(time * 1.3 + index) * 0.003
          
          // Complex floating motion with figure-8 patterns
          shape.position.x += velocity.x + Math.cos(time * 0.6 + index) * 0.015
          shape.position.y += velocity.y + Math.sin(time * 0.4 + index) * Math.cos(time * 0.8 + index) * animationConfig.waveIntensity
          shape.position.z += velocity.z + Math.sin(time * 0.3 + index) * 0.01
          
          // Pulsing scale effect
          const scale = 1 + Math.sin(time * 2 + index) * 0.1
          shape.scale.setScalar(scale)
          
          // Dynamic opacity changes
          if (shape.material instanceof THREE.MeshBasicMaterial) {
            shape.material.opacity = 0.1 + Math.sin(time * 1.5 + index) * 0.05
          }
        } else {
          // Simplified animation for reduced motion
          shape.rotation.x += velocity.rotX
          shape.rotation.y += velocity.rotY
          shape.rotation.z += velocity.rotZ
          
          // Simple floating motion
          shape.position.x += velocity.x
          shape.position.y += velocity.y + Math.sin(time + index) * animationConfig.waveIntensity
          shape.position.z += velocity.z
        }
        
        // Boundary wrapping for shapes
        if (shape.position.x > 18) shape.position.x = -18
        if (shape.position.x < -18) shape.position.x = 18
        if (shape.position.y > 18) shape.position.y = -18
        if (shape.position.y < -18) shape.position.y = 18
      })

      // Enhanced particle system rotation with wobble (accessibility-aware)
      if (animationConfig.enableComplexMotion) {
        particleSystem.rotation.y += animationConfig.rotationSpeed + Math.sin(time * 0.5) * 0.001
        particleSystem.rotation.x += (animationConfig.rotationSpeed * 0.7) + Math.cos(time * 0.7) * 0.0005
        particleSystem.rotation.z += (animationConfig.rotationSpeed * 0.3) + Math.sin(time * 1.1) * 0.0008
      } else {
        particleSystem.rotation.y += animationConfig.rotationSpeed
        particleSystem.rotation.x += animationConfig.rotationSpeed * 0.5
      }

      // Enhanced camera movement with breathing and swaying (accessibility-aware)
      if (animationConfig.enableComplexMotion) {
        camera.position.z = 10 + Math.sin(time * 0.4) * animationConfig.cameraMovement + Math.cos(time * 0.7) * 0.3
        camera.position.x = Math.sin(time * 0.2) * 0.5
        camera.position.y = Math.cos(time * 0.15) * 0.3
        
        // Subtle camera rotation for dynamic perspective
        camera.rotation.z = Math.sin(time * 0.1) * 0.02
      } else {
        // Minimal camera movement for reduced motion
        camera.position.z = 10 + Math.sin(time * 0.2) * animationConfig.cameraMovement
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current)
      }
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ zIndex: 0 }}
    />
  )
}
