import { forwardRef, useMemo, useContext } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";
import { Shader } from "./materials/Shader";
import { CharacterCreateContext } from "../context/CharacterCreateContext";

export const KenkuBers = forwardRef((props, ref) => {
  const { modelo } = useContext(CharacterCreateContext);

  const { nodes } = useGLTF(`/${modelo}.glb`);

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
        geometry={nodes[modelo].geometry}
        position={[0.33, -0.05, -0.68]}
        rotation={[1.6,0,0]}
        scale={[0.3, 0.3, 0.3]}
      >
        <shaderMaterial attach="material" {...Shader} uniforms={uniforms} />
      </mesh>
    </group>
  );
});
