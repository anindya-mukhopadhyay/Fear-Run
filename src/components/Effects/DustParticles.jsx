// components/Effects/DustParticles.jsx
import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DustParticles({ dustRef, playerRef }) {
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0.02 + Math.random() * 0.02, 0),
        life: Math.random() * 60, // life in frames
      })
    }
    return temp
  }, [])

  const groupRef = useRef()

  useFrame(() => {
    if (!dustRef.current || !dustRef.current.visible) return
    if (!playerRef || !playerRef.current) return

    const playerPos = playerRef.current.position

    particles.forEach((p, i) => {
      p.life -= 1
      if (p.life <= 0) {
        // Reset particle position to near player
        p.position.set(
          playerPos.x + (Math.random() - 0.5) * 0.5,
          playerPos.y + 0.05,
          playerPos.z + (Math.random() - 0.5) * 0.5
        )
        p.life = 60
      } else {
        p.position.add(p.velocity)
      }
      
      // Update mesh position manually since we re-use meshes
      if (groupRef.current && groupRef.current.children[i]) {
        groupRef.current.children[i].position.copy(p.position)
      }
    })
  })

  return (
    <group ref={(el) => {
      groupRef.current = el
      if (dustRef) dustRef.current = el
    }}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.position}>
          <sphereGeometry args={[0.01, 4, 4]} />
          <meshBasicMaterial color="gray" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}
