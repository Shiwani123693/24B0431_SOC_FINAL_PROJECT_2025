import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import planeScene from "../assets/3d/plane.glb"; // ✅ Make sure the path is correct

const Plane = ({ isRotation, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions["Take 001"]) {
      if (isRotation) {
        actions["Take 001"].play();
      } else {
        actions["Take 001"].stop();
      }
    }
  }, [actions, isRotation]);

  return (
    <primitive ref={ref} object={scene} {...props} />
  );
};

export default Plane;
