// components/PlayerControls.jsx
import { useThree, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function PlayerControls({ playerRef }) {
  const { camera, gl } = useThree()
  const pointerLock = useRef(false)
  const rotation = useRef({ x: 0, y: 0 }) // pitch & yaw
  const [isFPP, setIsFPP] = useState(true)

  const moveSpeed = 0.15
  const keys = useRef({})

  // Lock pointer for mouse control
  useEffect(() => {
    const onClick = () => {
      gl.domElement.requestPointerLock()
    }
    const onLock = () => (pointerLock.current = true)
    const onUnlock = () => (pointerLock.current = false)

    gl.domElement.addEventListener('click', onClick)
    document.addEventListener('pointerlockchange', () =>
      pointerLock.current = document.pointerLockElement === gl.domElement
    )

    return () => {
      gl.domElement.removeEventListener('click', onClick)
    }
  }, [gl.domElement])

  // Handle keyboard
  useEffect(() => {
    const down = (e) => {
      keys.current[e.key.toLowerCase()] = true
      if (e.key.toLowerCase() === 't') {
        setIsFPP(prev => !prev)
      }
    }
    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // Mouse movement for FPP
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!pointerLock.current) return
      rotation.current.y -= e.movementX * 0.002
      rotation.current.x -= e.movementY * 0.002
      rotation.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.current.x))
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useFrame(() => {
    if (!playerRef.current) return

    // Set camera based on FPP or TPP
    if (isFPP) {
      const headPos = new THREE.Vector3()
      playerRef.current.getWorldPosition(headPos)
      const offset = new THREE.Vector3(0, 1.7, 0) // head height
      camera.position.copy(headPos).add(offset)
    } else {
      const behind = new THREE.Vector3(0, 2, 5).applyEuler(new THREE.Euler(rotation.current.x, rotation.current.y, 0))
      const playerPos = new THREE.Vector3()
      playerRef.current.getWorldPosition(playerPos)
      camera.position.copy(playerPos.clone().add(behind))
    }

    camera.rotation.set(rotation.current.x, rotation.current.y, 0)

    // Movement
    const dir = new THREE.Vector3()
    const forward = new THREE.Vector3(
      -Math.sin(rotation.current.y),
      0,
      -Math.cos(rotation.current.y)
    )
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0))

    if (keys.current['w']) dir.add(forward)
    if (keys.current['s']) dir.sub(forward)
    if (keys.current['a']) dir.sub(right)
    if (keys.current['d']) dir.add(right)

    if (dir.length() > 0) {
      dir.normalize().multiplyScalar(moveSpeed)
      playerRef.current.position.add(dir)

      // Rotate character mesh in movement direction
      playerRef.current.rotation.y = Math.atan2(dir.x, dir.z)
    }
  })

  return null
}
