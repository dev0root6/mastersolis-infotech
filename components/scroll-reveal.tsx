"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { type ReactNode, useRef } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: "left" | "right" | "up" | "down"
  delay?: number
}

export function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: ScrollRevealProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1.33 1"] })

  const directionMap = {
    left: { x: [-200, 0], y: 0 },
    right: { x: [200, 0], y: 0 },
    up: { x: 0, y: [100, 0] },
    down: { x: 0, y: [-100, 0] },
  }

  const x = useTransform(scrollYProgress, [0, 1], directionMap[direction].x)
  const y = useTransform(scrollYProgress, [0, 1], directionMap[direction].y)
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0, 1, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        x: typeof x === "number" ? x : x,
        y: typeof y === "number" ? y : y,
        opacity,
      }}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
