"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal"
import Image from "next/image"
import PageWrapper from "@/components/page-wrapper"
import {
  ConvergingLines,
  RandomPositionBinding,
  RotatingTextReveal,
  ParallaxScroll,
  DrawingPath,
  MorphingContainer,
} from "@/components/exotic-animations"

export function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <PageWrapper>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <Navigation />

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-between overflow-hidden pt-20">
          <div className="absolute inset-0 z-0"></div>

          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-60" />

          <ConvergingLines />

          <motion.div
            className="relative z-10 w-1/2 px-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div className="mb-6 flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/master-SQBHQDdZB7xaYwl1eugjy26SnsCbaj.jpg"
                alt="Mastersolis"
                width={60}
                height={60}
                className="w-14 h-14 object-contain"
              />
            </motion.div>
            <h1 className="text-7xl font-bold mb-4 text-white">
              Mastersolis <span className="text-gray-300">InfoTech</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 font-light">
              Transforming Ideas into Digital Reality with Cutting-Edge Technology Solutions
            </p>
            <div className="flex gap-4">
              <Button className="bg-white hover:bg-gray-100 text-black font-bold px-8 py-3">Explore Services</Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center py-20 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden"
        >
          <DrawingPath />

          <ScrollReveal direction="left" className="max-w-6xl mx-auto px-8 w-full">
            <StaggerReveal>
              <motion.h2 className="text-5xl font-bold mb-8 text-white">
                About <span className="text-gray-400">Mastersolis</span>
              </motion.h2>

              <div className="grid grid-cols-2 gap-8">
                {[
                  {
                    title: "Our Mission",
                    desc: "To empower businesses through innovative IT solutions that drive growth, efficiency, and digital transformation in the modern economy.",
                  },
                  {
                    title: "Our Vision",
                    desc: "To be the preferred technology partner for businesses seeking reliable, scalable, and innovative digital solutions.",
                  },
                  {
                    title: "Expertise",
                    desc: "With 10+ years of industry experience, we deliver comprehensive IT consulting, development, and support services.",
                  },
                  {
                    title: "Commitment",
                    desc: "We are committed to excellence, innovation, and building long-term partnerships with our clients.",
                  },
                ].map((item, idx) => (
                  <MorphingContainer key={idx}>
                    <motion.div
                      className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-white/30 transition-all backdrop-blur-sm"
                      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)" }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </motion.div>
                  </MorphingContainer>
                ))}
              </div>
            </StaggerReveal>
          </ScrollReveal>
        </section>

        {/* Services Section */}
        <section id="services" className="min-h-screen flex items-center py-20 bg-black relative overflow-hidden">
          <ScrollReveal direction="right" className="max-w-6xl mx-auto px-8 w-full">
            <StaggerReveal>
              <motion.h2 className="text-5xl font-bold mb-12 text-white">
                Our <span className="text-gray-400">Services</span>
              </motion.h2>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { title: "Consulting", desc: "Strategic IT consulting for digital transformation" },
                  { title: "Development", desc: "Custom software and web application development" },
                  { title: "Data Analytics", desc: "Advanced analytics and business intelligence" },
                  { title: "Cloud Solutions", desc: "Cloud infrastructure and migration services" },
                  { title: "Cybersecurity", desc: "Comprehensive security and compliance solutions" },
                  { title: "24/7 Support", desc: "Round-the-clock technical support and maintenance" },
                ].map((service, idx) => (
                  <RandomPositionBinding key={idx}>
                    <motion.div
                      className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all backdrop-blur-sm"
                      whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.15)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.08, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                      <p className="text-gray-300">{service.desc}</p>
                    </motion.div>
                  </RandomPositionBinding>
                ))}
              </div>
            </StaggerReveal>
          </ScrollReveal>
        </section>

        {/* Internship Section */}
        <section
          id="internships"
          className="min-h-screen flex items-center py-20 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden"
        >
          <ScrollReveal direction="up" className="max-w-6xl mx-auto px-8 w-full">
            <StaggerReveal>
              <motion.h2 className="text-5xl font-bold mb-12 text-white">
                Internship <span className="text-gray-400">Program</span>
              </motion.h2>

              <motion.div className="mt-12 grid grid-cols-2 gap-8">
                {[
                  { track: "Full Stack Development", duration: "3-6 months" },
                  { track: "Cloud & DevOps", duration: "3-6 months" },
                  { track: "Data Science", duration: "3-6 months" },
                  { track: "Mobile Development", duration: "3-6 months" },
                ].map((prog, idx) => (
                  <ParallaxScroll key={idx} offset={40}>
                    <motion.div
                      className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-white/30 transition-all backdrop-blur-sm"
                      whileHover={{ y: -10, boxShadow: "0 15px 35px rgba(255, 255, 255, 0.2)" }}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.12 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-white">{prog.track}</h3>
                      <p className="text-gray-300 mb-4">Duration: {prog.duration}</p>
                      <Button className="bg-white hover:bg-gray-100 text-black font-bold w-full">Apply Now</Button>
                    </motion.div>
                  </ParallaxScroll>
                ))}
              </motion.div>
            </StaggerReveal>
          </ScrollReveal>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center py-20 bg-black border-t border-white/10 relative overflow-hidden"
        >
          <ScrollReveal direction="down" className="max-w-6xl mx-auto px-8 w-full">
            <StaggerReveal>
              <RotatingTextReveal
                text={
                  <motion.h2 className="text-5xl font-bold mb-12 text-white">
                    Get In <span className="text-gray-400">Touch</span>
                  </motion.h2>
                }
              />

              <motion.div className="grid grid-cols-2 gap-12">
                <motion.div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Contact Info</h3>
                    <p className="text-gray-300">Email: hello@mastersolis.com</p>
                    <p className="text-gray-300">Phone: +91 XXX XXX XXXX</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Business Hours</h3>
                    <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Sat - Sun: Closed</p>
                  </div>
                </motion.div>

                <motion.form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <Button className="w-full bg-white hover:bg-gray-100 text-black font-bold">Send Message</Button>
                </motion.form>
              </motion.div>
            </StaggerReveal>
          </ScrollReveal>
        </section>

        <Footer />
      </main>
    </PageWrapper>
  )
}

export default HomePage
