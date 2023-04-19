import { Player1, Player2, Boss } from "../three/Character";
import { useRef } from "react";
import { Color } from "three";
import '../styles/Styles.css';

export function CharPresention1() {
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
      <Player1
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
export function CharPresention2() {
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
      <Player2
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
export function CharPresention3() {
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
      <Boss
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
