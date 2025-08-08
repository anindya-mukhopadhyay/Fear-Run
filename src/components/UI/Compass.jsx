import React, { useRef, useEffect } from 'react'

export default function Compass({ playerRef }) {
  const compassRef = useRef()

  useEffect(() => {
    const updateRotation = () => {
      if (!playerRef?.current || !compassRef.current) return
      const rotationY = playerRef.current.rotation.y
      compassRef.current.style.transform = `rotate(${-rotationY}rad)`
      requestAnimationFrame(updateRotation)
    }
    updateRotation()
  }, [playerRef])

  return (
    <div
      ref={compassRef}
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: '50%',
        border: '2px solid white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
        fontWeight: 'bold',
        fontSize: '1.3rem',
        zIndex: 20,
        pointerEvents: 'none',
        transition: 'transform 0.1s linear',
      }}
    >
      N
    </div>
  )
}
