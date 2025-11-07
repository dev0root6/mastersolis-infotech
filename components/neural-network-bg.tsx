"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function NeuralNetworkBg() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const nodesRef = useRef<any[]>([])
  const zoomRef = useRef(1)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    scene.background = null

    const width = window.innerWidth
    const height = window.innerHeight

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
    }

    camera.position.z = 50
    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    // Create neural network nodes (white/gray dots)
    const nodeCount = 25
    const nodes: any[] = []
    const centralNodeIndex = 0

    for (let i = 0; i < nodeCount; i++) {
      const x = i === 0 ? 0 : (Math.random() - 0.5) * 80
      const y = i === 0 ? 0 : (Math.random() - 0.5) * 80
      const z = i === 0 ? 0 : (Math.random() - 0.5) * 40

      const geometry = new THREE.SphereGeometry(0.5, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0xffffff : 0xffffff,
        emissive: i === 0 ? 0xffffff : 0xcccccc,
        metalness: 0.3,
        roughness: 0.8,
      })
      const node = new THREE.Mesh(geometry, material)
      node.position.set(x, y, z)
      scene.add(node)
      nodes.push({
        mesh: node,
        originalPos: { x, y, z },
        velocity: {
          x: i === 0 ? 0 : (Math.random() - 0.5) * 0.5,
          y: i === 0 ? 0 : (Math.random() - 0.5) * 0.5,
          z: i === 0 ? 0 : (Math.random() - 0.5) * 0.5,
        },
      })
    }

    nodesRef.current = nodes

    // Create connection lines between nearby nodes
    const connections: any[] = []
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xaaaaaa,
      transparent: true,
      opacity: 0.4,
      linewidth: 1,
    })

    nodes.forEach((nodeA, idxA) => {
      nodes.forEach((nodeB, idxB) => {
        if (idxA < idxB) {
          const distance = nodeA.mesh.position.distanceTo(nodeB.mesh.position)
          if (distance < 25) {
            const points = [nodeA.mesh.position.clone(), nodeB.mesh.position.clone()]
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
            const line = new THREE.Line(lineGeometry, lineMaterial)
            scene.add(line)
            connections.push({
              line,
              nodeA: idxA,
              nodeB: idxB,
            })
          }
        }
      })
    })

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(30, 30, 30)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xcccccc, 0.5)
    pointLight2.position.set(-30, -30, 30)
    scene.add(pointLight2)

    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      zoomRef.current = 1 + scrollPercentage * 5
    }

    window.addEventListener("scroll", handleScroll)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Move nodes and scale central node
      nodes.forEach((node, idx) => {
        if (idx === centralNodeIndex) {
          node.mesh.scale.set(zoomRef.current, zoomRef.current, zoomRef.current)
        } else {
          node.mesh.position.x += node.velocity.x * 0.1
          node.mesh.position.y += node.velocity.y * 0.1
          node.mesh.position.z += node.velocity.z * 0.1

          if (Math.abs(node.mesh.position.x) > 40) node.velocity.x *= -1
          if (Math.abs(node.mesh.position.y) > 40) node.velocity.y *= -1
          if (Math.abs(node.mesh.position.z) > 20) node.velocity.z *= -1

          node.mesh.scale.set(
            1 + Math.sin(Date.now() * 0.001 + node.mesh.position.x) * 0.15,
            1 + Math.sin(Date.now() * 0.001 + node.mesh.position.x) * 0.15,
            1 + Math.sin(Date.now() * 0.001 + node.mesh.position.x) * 0.15,
          )
        }
      })

      // Update connection lines
      connections.forEach((conn) => {
        const posA = nodes[conn.nodeA].mesh.position
        const posB = nodes[conn.nodeB].mesh.position
        const geometry = conn.line.geometry as THREE.BufferGeometry
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array([posA.x, posA.y, posA.z, posB.x, posB.y, posB.z]), 3),
        )
        geometry.attributes.position.needsUpdate = true
      })

      camera.position.z = 50 / zoomRef.current

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 w-screen h-screen pointer-events-none" />
}

export default NeuralNetworkBg
