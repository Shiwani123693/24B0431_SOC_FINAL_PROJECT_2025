import { useGLTF } from '@react-three/drei'
import {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import skyScene from '../assets/3d/sky.glb'
const Cloud = ({isRotation}) => {

    const sky=useGLTF(skyScene)
    const skyRef=useRef();
    useFrame((_,delta)=>{
      if(isRotation){
        skyRef.current.rotation.y += 0.15*delta;
      }
    })
  return (
   <mesh    ref={skyRef} >
    <primitive object={sky.scene}></primitive>
   </mesh>
  )
}

export default Cloud