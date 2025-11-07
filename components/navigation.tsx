"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const links = ["Home", "About", "Services", "Internships", "Contact"]

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-black/85 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/master-SQBHQDdZB7xaYwl1eugjy26SnsCbaj.jpg"
              alt="Mastersolis Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
            Mastersolis
          </Link>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex gap-2">
          <Link href="/auth/signin">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-white hover:bg-gray-200 text-black font-bold">Sign Up</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation
