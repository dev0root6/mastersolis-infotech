"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// Converging Lines Animation
export function ConvergingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{
            x: Math.random() * 1000 - 500,
            y: Math.random() * 800 - 400,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.5 + i * 0.1,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          style={{ width: "200px" }}
        />
      ))}
    </div>
  )
}

// Random Position Binding
export function RandomPositionBinding({ children }: { children: React.ReactNode }) {
  const positions = Array.from({ length: 4 }, () => ({
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    rotate: Math.random() * 10 - 5,
  }))

  return (
    <motion.div
      initial={{ ...positions[0], opacity: 0 }}
      whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// Staggered Grid Burst
export function StaggeredGridBurst({ children, itemCount = 6 }: { children: React.ReactNode; itemCount?: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }}>
      {children}
    </motion.div>
  )
}

// Rotating Text Reveal
export function RotatingTextReveal({ text }: { text: string }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ rotateX: 90, opacity: 0 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ perspective: "1000px" }}
      >
        {text}
      </motion.div>
    </div>
  )
}

// Parallax Scroll Effect
export function ParallaxScroll({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (latest) => latest * 0.5)

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

// Drawing Path Animation
export function DrawingPath() {
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      <motion.path
        d="M 0,200 Q 300,0 600,200 T 1200,200"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
      />
    </svg>
  )
}

// Morphing Container
export function MorphingContainer({ children }: { children: React.ReactNode }) {
  const randomShape = {
    borderRadius: `${Math.random() * 30}% ${Math.random() * 30}% ${Math.random() * 30}% ${Math.random() * 30}%`,
  }

  return (
    <motion.div
      initial={{
        ...randomShape,
        scale: 0.8,
        opacity: 0,
      }}
      whileInView={{
        borderRadius: "16px",
        scale: 1,
        opacity: 1,
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
