// components/Effects/Moonlight.jsx
import React from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Moonlight() {
  const { scene } = useThree()

  // Optional fog for mood
  scene.fog = new THREE.FogExp2('#0a0a1f', 0.005)

  return (
    <>
      {/* Moonlight (directional) */}
      <directionalLight
        position={[10, 20, -10]}
        intensity={1.5}
        color={'#aaccff'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <mesh position={[10, 20, -10]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[2, 6, 64, 20, true]} />
        <meshBasicMaterial
          transparent
          opacity={0.25}
          color={'#aaccff'}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}
