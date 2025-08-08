// components/Effects/DustParticles.jsx
import React, { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DustParticles({ position }) {
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: new THREE.Vector3(
          position.x + (Math.random() - 0.5) * 0.2,
          position.y + 0.05,
          position.z + (Math.random() - 0.5) * 0.2
        ),
        velocity: new THREE.Vector3(0, 0.02 + Math.random() * 0.02, 0),
      })
    }
    return temp
  }, [position.x, position.y, position.z])

  useFrame(() => {
    particles.forEach((p) => {
      p.position.add(p.velocity)
    })
  })

  return (
    <group>
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.position}>
          <sphereGeometry args={[0.01, 4, 4]} />
          <meshBasicMaterial color="gray" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}
