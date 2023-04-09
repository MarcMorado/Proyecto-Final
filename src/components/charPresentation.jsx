import { KenkuWarrior } from "../three/kenkuWarrior";
import { KenkuBers } from "../three/kenkuBerserk";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";
import '../styles/Styles.css';

export function CharPresention() {
  const refChar = useRef(null);
  
  //! Interactivity

  // let mouseX = 0;
  // let mouseY = 0;

  // let targetX = 0;
  // let targetY = 0;

  // const windowX = window.innerWidth / 2;
  // const windowY = window.innerHeight / 2;

  // const onDocumentMouseMove = (event) => {
  //   mouseX = event.clientX - windowX;
  //   mouseY = event.clientY - windowY;
  // };

  // document.addEventListener("mousemove", onDocumentMouseMove);


  // useFrame(() => {
  //   const { current: group } = refChar;

  //   targetX = mouseX * .001;
  //   targetY = mouseY * .001;

  //   group.rotation.y += .5 * (targetX -group.rotation.y)
  //   group.rotation.x += .05 * (targetY -group.rotation.x)
  //   group.rotation.z += -.05 * (targetY -group.rotation.x)

    
  //   if (group) {
  //     group.rotation.y += 0.005;
  //   }
  // });

  //* GUI
  // const { current: group } = refChar;
  
  // const gui = new GUI ();

  // const color1 = {
  //   color:0xff0000
  // }
  // const color2 = {
  //   color:"#919191"
  // }
  // const color3 = {
  //   color:"#515151"
  // }
  // const color4 = {
  //   color:"#2d2d2d"
  // }

  // gui
  //   .addColor(color1, 'color')
  //   .onChange(()=>{
  //     group.color.set(color1.color)
  //   })

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
      <KenkuBers
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
