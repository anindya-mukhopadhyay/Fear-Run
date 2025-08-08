// import { useFrame } from '@react-three/fiber'
// import React, { useRef } from 'react'
// import * as THREE from 'three'
// import { useGLTF, useAnimations } from '@react-three/drei'

// export default function Enemy({ playerRef, setGameState }) {
//   const enemyRef = useRef()
//   const speed = 0.03

//   const { scene, animations } = useGLTF('/ww.glb') // Enemy model in public folder
//   const { actions, mixer } = useAnimations(animations, enemyRef)
//   const currentAction = useRef('Idle')

//   const playAnimation = (name) => {
//     if (currentAction.current !== name && actions[name]) {
//       actions[currentAction.current]?.fadeOut(0.2)
//       actions[name].reset().fadeIn(0.2).play()
//       currentAction.current = name
//     }
//   }

//   useFrame((_, delta) => {
//     if (!enemyRef.current || !playerRef?.current) return

//     const enemyPos = enemyRef.current.position
//     const playerPos = playerRef.current.position

//     const direction = new THREE.Vector3().subVectors(playerPos, enemyPos)

//     if (direction.length() > 0.01) {
//       direction.normalize().multiplyScalar(speed)
//       enemyRef.current.position.add(direction)
//       playAnimation('Run')
//     } else {
//       playAnimation('Idle')
//     }

//     // Rotate enemy to face player
//     const lookAtTarget = new THREE.Vector3().copy(playerPos)
//     enemyRef.current.lookAt(lookAtTarget)

//     // Collision detection
//     const distance = enemyPos.distanceTo(playerPos)
//     if (distance < 1.0) {
//       setGameState('gameover')
//     }

//     mixer?.update(delta)
//   })

//   return (
//     <primitive
//       ref={enemyRef}
//       object={scene}
//       position={[5, 0, 5]}
//       scale={0.9}
//     />
//   )
// }



import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Enemy({ playerRef, setGameState }) {
  const enemyRef = useRef()
  const speed = 0.03

  const { scene, animations } = useGLTF('/ww.glb')
  const { actions, mixer } = useAnimations(animations, enemyRef)
  const currentAction = useRef('Idle')

  const devMode = true // 🛠️ Set to false when you're ready to enable enemy again

  const playAnimation = (name) => {
    if (currentAction.current !== name && actions[name]) {
      actions[currentAction.current]?.fadeOut(0.2)
      actions[name].reset().fadeIn(0.2).play()
      currentAction.current = name
    }
  }

  useFrame((_, delta) => {
    if (devMode) {
      playAnimation('Idle')
      mixer?.update(delta)
      return // ⛔ Skip movement & collision
    }

    if (!enemyRef.current || !playerRef?.current) return

    const enemyPos = enemyRef.current.position
    const playerPos = playerRef.current.position

    const direction = new THREE.Vector3().subVectors(playerPos, enemyPos)

    if (direction.length() > 0.01) {
      direction.normalize().multiplyScalar(speed)
      enemyRef.current.position.add(direction)
      playAnimation('Run')
    } else {
      playAnimation('Idle')
    }

    // Rotate enemy to face player
    const lookAtTarget = new THREE.Vector3().copy(playerPos)
    enemyRef.current.lookAt(lookAtTarget)

    // Collision detection
    const distance = enemyPos.distanceTo(playerPos)
    if (distance < 1.0) {
      setGameState('gameover')
    }

    mixer?.update(delta)
  })

  return (
    <primitive
      ref={enemyRef}
      object={scene}
      position={[5, 0, 5]}
      scale={0.9}
    />
  )
}
