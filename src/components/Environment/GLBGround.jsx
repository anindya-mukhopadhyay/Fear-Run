// // src/components/Environment/GLBGround.jsx
// import React from 'react'
// import { useGLTF } from '@react-three/drei'

// export default function GLBGround(props) {
//   const { scene } = useGLTF('/models/horror house.glb') // adjust the path if needed

//   return (
//     <primitive
//       object={scene}
//       {...props}
//       rotation={[0, Math.PI / 2, 0]} // Rotated horizontally (Y-axis) 90 degrees
//       position={[0, 0, 0]} // Adjust position if model floats
//       scale={[3, 3, 4]} // Adjust scale as needed
//     />
//   )
// }

// src/components/Environment/GLBGround.jsx
import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function GLBGround(props) {
  // const horrorHouse = useGLTF('/models/horror house.glb')
  // EXTREMELY HEAVY MODELS DISABLED TO PREVENT WEBGL CONTEXT LOSS ON VERCEL
  // const statue = useGLTF('/models/home_house_farm.glb') 
  // const water_tower_water_tanker = useGLTF('/models/water_tower_water_tanker.glb') 
  // const farm_house_poor = useGLTF('/models/farm_house_poor.glb') 
  // const old_car2 = useGLTF('/models/old_car_-_vaz_2107.glb') 
  // const lamp_post = useGLTF('/models/lamp_post.glb') 
  // const statue1 = useGLTF('/models/statue.glb') 
  // const standhouse = useGLTF('/models/standhouse.glb') 


  return (
    <group {...props}>
      {/* 
      <primitive
        object={horrorHouse.scene}
        rotation={[0, Math.PI / 2, 0]}
        position={[0, 0, 0]}
        scale={[3, 3, 4]}
      />
      */}

      {/* Simple Floor to prevent void until you optimize your assets */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#1a3300" />
      </mesh>

      {/* EXTREMELY HEAVY MODELS DISABLED 
      <primitive
        object={statue.scene}
        position={[70, 0, -5]}
        scale={[1.2, 1.2, 1.2]} 
      />

      <primitive
        object={water_tower_water_tanker.scene}
        position={[115, 0, -20]}
        scale={[1, 1, 1]} 
      />

      <primitive
        object={farm_house_poor.scene}
        position={[109, 0, -20]} 
        scale={[1, 1, 1]} 
      />

      <primitive
        object={old_car2.scene}
        position={[90, -0.09, -10]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={[0.01, 0.01, 0.02]} 
      />

      <primitive
        object={lamp_post.scene}
        position={[77, -0.2, -20]} 
        scale={[0.01, 0.07, 0.01]} 
      />

      <primitive
        object={statue1.scene}
        position={[90, -0.02, -5]} 
        rotation={[0, Math.PI / 2, 0]}
        scale={[2, 2, 2]} 
      />

      <primitive
        object={standhouse.scene}
        position={[90, -0.02, 20]} 
        rotation={[0, Math.PI / 2, 0]}
        scale={[2, 2, 2]} 
      />
      */}

    </group>
  )
}
