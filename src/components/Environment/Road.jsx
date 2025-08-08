import React from 'react'

export default function Road() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
      <planeGeometry args={[50, 100]} />
      <meshStandardMaterial color="#2f2f2f" />
    </mesh>
  )
}
