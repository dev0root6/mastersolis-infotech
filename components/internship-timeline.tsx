"use client"

import { motion } from "framer-motion"

export function InternshipTimeline() {
  const stages = [
    { title: "Application", desc: "Submit your profile and interests" },
    { title: "Interview", desc: "Technical and cultural fit assessment" },
    { title: "Onboarding", desc: "Get started with your mentor" },
    { title: "Learning", desc: "Build real-world projects" },
    { title: "Growth", desc: "Advance your skills and expertise" },
    { title: "Placement", desc: "Opportunity for permanent role" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-pink-500 transform -translate-x-1/2" />

      <div className="space-y-8">
        {stages.map((stage, idx) => (
          <motion.div
            key={idx}
            className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            variants={itemVariants}
          >
            <div className="w-1/2 px-8">
              <div className="bg-gradient-to-r from-cyan-950/50 to-pink-950/50 border border-cyan-500/30 rounded-lg p-6 text-right">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{stage.title}</h3>
                <p className="text-gray-300">{stage.desc}</p>
              </div>
            </div>
            <div className="w-0 flex justify-center">
              <motion.div className="w-4 h-4 bg-cyan-500 rounded-full ring-4 ring-black" whileHover={{ scale: 1.5 }} />
            </div>
            <div className="w-1/2" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default InternshipTimeline
