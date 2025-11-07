"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function HeroScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 50

    // Create network nodes
    const nodeCount = 8
    const nodes = []
    const connections = []

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 20
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = (Math.random() - 0.5) * 10

      const geometry = new THREE.SphereGeometry(0.8, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        emissive: 0x0099ff,
        metalness: 0.7,
        roughness: 0.2,
      })
      const node = new THREE.Mesh(geometry, material)
      node.position.set(x, y, z)
      scene.add(node)
      nodes.push({ mesh: node, angle, radius, z })
    }

    // Center node
    const centerGeometry = new THREE.SphereGeometry(1.2, 32, 32)
    const centerMaterial = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff0099,
      metalness: 0.7,
      roughness: 0.2,
    })
    const centerNode = new THREE.Mesh(centerGeometry, centerMaterial)
    scene.add(centerNode)

    // Create connection lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.5 })
    nodes.forEach((node) => {
      const points = [centerNode.position, node.mesh.position]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      scene.add(line)
      connections.push({ line, nodeIndex: nodes.indexOf(node) })
    })

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d4ff, 1, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.8, 100)
    pointLight2.position.set(-10, -10, 10)
    scene.add(pointLight2)

    // Animation loop
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate nodes
      nodes.forEach((node, idx) => {
        const time = Date.now() * 0.0005
        node.mesh.position.x = Math.cos(node.angle + time) * node.radius
        node.mesh.position.y = Math.sin(node.angle + time) * node.radius
        node.mesh.rotation.x += 0.005
        node.mesh.rotation.y += 0.01
      })

      // Pulse center node
      centerNode.scale.set(
        1 + Math.sin(Date.now() * 0.003) * 0.1,
        1 + Math.sin(Date.now() * 0.003) * 0.1,
        1 + Math.sin(Date.now() * 0.003) * 0.1,
      )
      centerNode.rotation.x += 0.002
      centerNode.rotation.y += 0.003

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

export default HeroScene
