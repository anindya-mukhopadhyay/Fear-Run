// components/Environment/SkyScene.jsx
import React, { useRef, useState, useEffect } from 'react'
import { Sky, Stars, Clouds, Cloud } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SkyScene() {
  const lightningRef = useRef()
  const [flashTimer, setFlashTimer] = useState(0)

  // Simulate lightning flashes randomly
  useFrame(() => {
    if (flashTimer <= 0 && Math.random() < 0.003) {
      setFlashTimer(5)
    }
    if (flashTimer > 0) {
      lightningRef.current.intensity = Math.random() * 5
      setFlashTimer((t) => t - 1)
    } else {
      lightningRef.current.intensity = 0
    }
  })

  return (
    <>
      {/* Stars in night sky */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade />

      {/* Procedural Sky for base lighting (deep color) */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.49}
        azimuth={0.25}
        mieCoefficient={0.005}
        turbidity={10}
        rayleigh={2}
      />

      {/* Moon (light + sphere) */}
      <directionalLight
        position={[20, 50, -20]}
        intensity={0.4}
        color="#b0c4de"
        castShadow
      />
      <mesh position={[20, 50, -20]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={1} color="#ddd" />
      </mesh>

      {/* Cloud layer */}
      <Clouds material={{ opacity: 0.4 }}>
        <Cloud
          seed={1}
          bounds={[30, 10, 20]}
          volume={10}
          color="white"
          fade={100}
          speed={0.2}
        />
      </Clouds>

      {/* Lightning flash light */}
      <pointLight
        ref={lightningRef}
        position={[0, 20, 0]}
        color="#ffffff"
        intensity={0}
        distance={50}
        decay={2}
      />
    </>
  )
}
