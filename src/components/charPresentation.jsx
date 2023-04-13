import { Character } from "../three/Character";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";
import '../styles/Styles.css';

export function CharPresention() {
  const refChar = useRef(null);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        color="white"
        position={[15, 15, 15]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Character
        ref={refChar}
        position={[0, 0, 0]}
        scale={[0.08, 0.08, 0.08]}
        rotation={[0, 1.5, 0]}
        colors={[
          new Color("#bcbcbc").convertLinearToSRGB(),
          new Color("#919191").convertLinearToSRGB(),
          new Color("#515151").convertLinearToSRGB(),
          new Color("#2d2d2d").convertLinearToSRGB(),
        ]}
      />
    </>
  );
}
