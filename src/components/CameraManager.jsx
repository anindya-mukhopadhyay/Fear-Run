import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export default function CameraManager({ playerRef, cameraMode }) {
  const { camera } = useThree()
  const pitchRef = useRef(0) // for up-down
  const yawRef = useRef(0)   // for left-right

  useEffect(() => {
    camera.fov = 60
    camera.updateProjectionMatrix()
  }, [camera])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement) {
        yawRef.current -= e.movementX * 0.002
        pitchRef.current -= e.movementY * 0.002
        pitchRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchRef.current)) // clamp pitch
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (playerRef.current) {
      const pos = playerRef.current.position

      if (cameraMode === 'TPP') {
        camera.position.lerp(pos.clone().add({ x: 0, y: 3, z: 6 }), 0.1)
        camera.lookAt(pos)
      } else if (cameraMode === 'FPP') {
        // Position camera at head level
        camera.position.lerp(pos.clone().add({ x: 0, y: 1.5, z: 0 }), 0.2)

        // Create camera rotation quaternion based on yaw and pitch
        const quaternion = playerRef.current.quaternion.clone()
        quaternion.setFromEuler({ x: pitchRef.current, y: yawRef.current, z: 0, order: 'YXZ' })

        camera.quaternion.slerp(quaternion, 0.2)

        // Optional: Rotate the player mesh left-right (yaw only)
        playerRef.current.rotation.y = yawRef.current
      }
    }
  })

  return null
}
