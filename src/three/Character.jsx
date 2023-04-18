import { forwardRef, useMemo, useContext } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3, TextureLoader } from "three";
import { Shader } from "./materials/Shader";
import { CharacterCreateContext } from "../context/CharacterCreateContext";

export const Character = forwardRef((props, ref) => {
  const { modelo } = useContext(CharacterCreateContext);

  const { nodes } = useGLTF(`/${modelo}.glb`);

  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("/warrior.png");

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
        rotation={[1.6, 0, 0]}
        scale={[0.3, 0.3, 0.3]}
      >
        {modelo === "asd" ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <shaderMaterial attach="material" {...Shader} uniforms={uniforms} />
        )}
      </mesh>
    </group>
  );
});

useGLTF.preload("/archer.glb");
useGLTF.preload("/barbarian.glb");
useGLTF.preload("/dragon.glb");
useGLTF.preload("/berserker.glb");
useGLTF.preload("/warrior.glb");
useGLTF.preload("/marauder.glb");
useGLTF.preload("/wizard.glb");
useGLTF.preload("/warlock.glb");
