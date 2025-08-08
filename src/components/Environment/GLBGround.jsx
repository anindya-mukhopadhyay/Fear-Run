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
  const horrorHouse = useGLTF('/models/horror house.glb')
  const statue = useGLTF('/models/home_house_farm.glb') // Replace with your second model's path
  const water_tower_water_tanker = useGLTF('/models/water_tower_water_tanker.glb') // Replace with your second model's path
  const farm_house_poor = useGLTF('/models/farm_house_poor.glb') // Replace with your second model's path
  const old_car2 = useGLTF('/models/old_car_-_vaz_2107.glb') // Replace with your second model's path
  const lamp_post = useGLTF('/models/lamp_post.glb') // Replace with your second model's path
  const statue1 = useGLTF('/models/statue.glb') // Replace with your second model's path
  const standhouse = useGLTF('/models/standhouse.glb') // Replace with your second model's path


  return (
    <group {...props}>
      {/* Horror House */}
      <primitive
        object={horrorHouse.scene}
        rotation={[0, Math.PI / 2, 0]}
        position={[0, 0, 0]}
        scale={[3, 3, 4]}
      />

      {/* Statue or Second Model */}
      <primitive
        object={statue.scene}
        position={[70, 0, -5]} // Position it differently from the house
        scale={[1.2, 1.2, 1.2]} // Adjust scale as needed
      />

      {/* Water Tower */}
      <primitive
        object={water_tower_water_tanker.scene}
        position={[115, 0, -20]} // Position it differently from the house
        scale={[1, 1, 1]} // Adjust scale as needed
      />


      {/* tin house */}
      <primitive
        object={farm_house_poor.scene}
        position={[109, 0, -20]} // Position it differently from the house
        scale={[1, 1, 1]} // Adjust scale as needed
      />

      {/* old car */}
      <primitive
        object={old_car2.scene}
        position={[90, -0.09, -10]} // Position it differently from the house
        rotation={[0, Math.PI / 2, 0]} // Adjust rotation if needed
        scale={[0.01, 0.01, 0.02]} // Adjust scale as needed
      />

      {/* lamp post */}
      <primitive
        object={lamp_post.scene}
        position={[77, -0.2, -20]} // Position it differently from the house
        //rotation={[0, Math.PI / 2, 0]} // Adjust rotation if needed
        scale={[0.01, 0.07, 0.01]} // Adjust scale as needed
      />
      {/* Statue */}
      <primitive
        object={statue1.scene}
        position={[90, -0.02, -5]} // Position it differently from the house
        rotation={[0, Math.PI / 2, 0]}
        scale={[2, 2, 2]} // Adjust
        // scale as needed
      />
      {/* Stand house */}
      <primitive
        object={standhouse.scene}
        position={[90, -0.02, 20]} // Position it differently from the house
        rotation={[0, Math.PI / 2, 0]}
        scale={[2, 2, 2]} // Adjust
        // scale as needed
      />

    </group>
  )
}
