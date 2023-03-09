import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Character = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/kenku-warrior.glb");

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group27308.geometry}
        material={nodes.Group27308.material}
        position={[0.33, -0.05, -0.68]}
        scale={[.1,.1,.1]}
      >
      </mesh>
    </group>
  );
});

useGLTF.preload("/kenku-warrior.glb");