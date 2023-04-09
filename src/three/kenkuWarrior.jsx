import { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { Shader } from "./materials/Shader";

export const KenkuWarrior = forwardRef((props, ref) => {
  const { nodes} = useGLTF("/kenku.glb");

  const uniforms = useMemo(
    () => ({
      colorMap: {
        value: props.colors,
      },
      brightnessThresholds: {
        value: [0.7, 0.35, 0.001],
      },
      lightPosition: { value: new Vector3(15, 15, 15) },
    }),
    [props.colors]
  );

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group27308.geometry}
        position={[0.33, -0.05, -0.68]}
        scale={[0.1, 0.1, 0.1]}
      >
      <shaderMaterial
          attach="material"
          {...Shader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
});

useGLTF.preload("/kenku.glb");
