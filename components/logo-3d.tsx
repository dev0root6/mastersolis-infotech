"use client"

import { Canvas } from "@react-three/fiber"
import { useRef, useEffect } from "react"

function LogoMesh() {
  const groupRef = useRef(null)

  useEffect(() => {
    if (!groupRef.current) return
    let animationId
    let time = 0

    const animate = () => {
      time += 0.01
      if (groupRef.current) {
        groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.3
        groupRef.current.rotation.y += 0.008
        groupRef.current.rotation.z = Math.cos(time * 0.5) * 0.2
        groupRef.current.position.y = Math.sin(time * 0.8) * 0.2
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <group ref={groupRef}>
      {/* Main fox head silhouette */}
      <mesh>
        <boxGeometry args={[2, 2, 0.5]} />
        <meshPhongMaterial color="#ffffff" emissive="#e0e0e0" emissiveIntensity={0.2} wireframe={false} />
      </mesh>

      {/* Outer glow ring (white) */}
      <mesh scale={1.15}>
        <torusGeometry args={[1.5, 0.12, 32, 100]} />
        <meshPhongMaterial color="#f5f5f5" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* Inner accent ring (grey) */}
      <mesh rotation={[Math.PI / 4, 0, 0]} scale={0.9}>
        <torusGeometry args={[1.3, 0.1, 32, 100]} />
        <meshPhongMaterial color="#cccccc" emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>

      {/* Tech particles orbiting (white) */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[Math.cos((i / 12) * Math.PI * 2) * 2.2, Math.sin((i / 12) * Math.PI * 2) * 2.2, 0]}
          scale={0.8}
        >
          <octahedronGeometry args={[0.12, 0]} />
          <meshPhongMaterial color="#f0f0f0" emissive="#ffffff" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Pulsing core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial
          color="#e8e8e8"
          emissive="#d0d0d0"
          emissiveIntensity={0.3}
          wireframe={true}
          wireframeLinewidth={1}
        />
      </mesh>
    </group>
  )
}

export function Logo3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} className="w-full h-full">
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, 10]} intensity={0.7} color="#e0e0e0" />
      <pointLight position={[0, 0, 15]} intensity={0.5} color="#f0f0f0" />
      <LogoMesh />
    </Canvas>
  )
}
