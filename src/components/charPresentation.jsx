import { Character } from "../three/Character";


export function CharPresention() {

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
          position={[0, 0, 0]}
          scale={[.08,.08,.08]}
          rotation={[0,1.5,0]}
        />
      </>
    );
  }