"use client"

import type React from "react"

import { NeuralNetworkBg } from "@/components/neural-network-bg"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralNetworkBg />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-60 pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </main>
  )
}

export default PageWrapper
