import { Character } from "../three/Character";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";

export function CharPresention() {
  const refChar = useRef(null);

  useFrame(() => {
    const { current: group } = refChar;
    if (group) {
      group.rotation.y += 0.005;
    }
  });

  //! Interactivity

  // document.addEventListener('mousemove', onDocumentMouseMove)

  let mouseX = 0;
  let mouseY = 0;

  let targetX = 0;
  let targetY = 0;

  const windowX = window.innerWidth/2;
  const windowY = window.innerHeight/2;

  // const onDocumentMouseMove = (event) =>{
  //   mouseX = (event.clientX - windowX)
  //   mouseY = (event.clientY - windowY)
  // }

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
          scale={[.08,.08,.08]}
          rotation={[0,1.5,0]}
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