// components/Player.jsx
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import DustParticles from './Effects/DustParticles'

export default function Player({ playerRef }) {
  const localRef = useRef()
  const keysPressed = useRef({})
  const speed = 0.1
  const [isRunning, setIsRunning] = useState(false)

  const { scene, animations } = useGLTF('/c.glb')
  const { actions, mixer } = useAnimations(animations, localRef)
  const currentAction = useRef('Idle')

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const playAnimation = (name) => {
    if (currentAction.current !== name && actions[name]) {
      actions[currentAction.current]?.fadeOut(0.2)
      actions[name].reset().fadeIn(0.2).play()
      currentAction.current = name
    }
  }

  useFrame((_, delta) => {
    if (!localRef.current) return
    const direction = new THREE.Vector3()

    if (keysPressed.current['w'] || keysPressed.current['arrowup']) direction.z -= 1
    if (keysPressed.current['s'] || keysPressed.current['arrowdown']) direction.z += 1
    if (keysPressed.current['a'] || keysPressed.current['arrowleft']) direction.x -= 1
    if (keysPressed.current['d'] || keysPressed.current['arrowright']) direction.x += 1

    const isMoving = direction.length() > 0

    setIsRunning(isMoving)

    if (isMoving) {
      direction.normalize().multiplyScalar(speed)
      localRef.current.position.add(direction)

      const angle = Math.atan2(direction.x, direction.z)
      localRef.current.rotation.y = angle

      playAnimation('Run')
    } else {
      playAnimation('Idle')
    }

    mixer?.update(delta)
  })

  return (
    <>
      <primitive
        ref={(el) => {
          localRef.current = el
          if (playerRef) playerRef.current = el
        }}
        object={scene}
        position={[0, 0, 0]}
        scale={0.1}
      />
      {isRunning && localRef.current && (
        <DustParticles position={localRef.current.position} />
      )}
    </>
  )
}
