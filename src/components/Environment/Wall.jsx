import React from 'react'

export default function Wall({ position, size = [10, 2, 0.5], color = 'gray', rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
    