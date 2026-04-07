import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, Cloud } from '@react-three/drei'
import './App.css'

// Game Components
import Player from './components/Player'
import Enemy from './components/Enemy'
import CameraManager from './components/CameraManager'
import GLBGround from './components/Environment/GLBGround'
import Moonlight from './components/Effects/Moonlight'

// UI Overlay
import Compass from './components/UI/Compass'

function App() {
  const [gameState, setGameState] = useState('start')
  const [countdown, setCountdown] = useState(3)
  const [cameraMode, setCameraMode] = useState('TPP')
  const bgMusicRef = useRef(null)
  const playerRef = useRef()

  // Camera toggle on 'T'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 't') {
        setCameraMode((prev) => (prev === 'TPP' ? 'FPP' : 'TPP'))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle background music
  useEffect(() => {
    if (bgMusicRef.current) {
      if (gameState === 'playing') {
        bgMusicRef.current.volume = 0.4
        bgMusicRef.current.play().catch(() => {})
      } else {
        bgMusicRef.current.pause()
        bgMusicRef.current.currentTime = 0
      }
    }
  }, [gameState])

  // Handle countdown timer
  useEffect(() => {
    let timer
    if (gameState === 'countdown') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000)
        new Audio('/321.mp3').play().catch(() => {})
      } else {
        new Audio('/go.mp3').play().catch(() => {})
        setTimeout(() => setGameState('playing'), 1000)
      }
    }
    return () => clearTimeout(timer)
  }, [gameState, countdown])

  return (
    <div className="canvas-container">
      {/* Start Screen */}
      {gameState === 'start' && (
        <div className="overlay">
          <h1>Fear Runner</h1>
          <button onClick={() => { setCountdown(3); setGameState('countdown') }}>Start Game</button>
        </div>
      )}

      {/* Countdown Screen */}
      {gameState === 'countdown' && (
        <div className="overlay">
          <h1>Game starting in</h1>
          <h2 style={{ fontSize: '4rem' }}>{countdown === 0 ? 'GO!' : countdown}</h2>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="overlay">
          <h1>Game Over</h1>
          <button onClick={() => setGameState('start')}>Restart</button>
        </div>
      )}

      {/* Canvas + Compass for active gameplay - ALWAYS mounted but hidden to prevent Context Lost from rapid unmount/remount */}
      <div style={{ display: (gameState === 'playing' || gameState === 'countdown') ? 'block' : 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Canvas
            dpr={1} // STRICTLY set to 1 to prevent SwiftShader/Vercel crashes
            gl={{ powerPreference: "high-performance", antialias: false, preserveDrawingBuffer: false }}
            shadows
            onClick={() => {
              const canvas = document.querySelector('canvas')
              if (canvas && document.pointerLockElement !== canvas) {
                canvas.requestPointerLock()
              }
            }}
          >
            <React.Suspense fallback={null}>
              <ambientLight intensity={0.2} />
              <Moonlight />
              <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade />
              
              <GLBGround />
              <Player playerRef={playerRef} cameraMode={cameraMode} />
              {/* <Enemy playerRef={playerRef} setGameState={setGameState} /> TEMPORARILY DISABLED to fix VRAM crashing */}
              <CameraManager playerRef={playerRef} cameraMode={cameraMode} />
            </React.Suspense>
          </Canvas>

          {/* Compass Overlay */}
          <Compass playerRef={playerRef} />
      </div>

      {/* Background Music */}
      <audio ref={bgMusicRef} src="/bg-music.mp3" loop />
    </div>
  )
}

export default App
