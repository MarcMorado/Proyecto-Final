import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CharPresention1, CharPresention2, CharPresention3 } from "../components/charPresentation";
import { Ground } from "./Ground";

export function FiberContainer1() {
  return (
    <Canvas camera={{ position: [14.4666, 2.0365, 5.556165], fov: 40 }} shadows>
      <CharPresention1 />
      <Ground />
      <OrbitControls minDistance={4} maxDistance={30} enableRotate={true}/>
    </Canvas>
  );
}
export function FiberContainer2() {
  return (
    <Canvas camera={{ position: [14.4666, 2.0365, 5.556165], fov: 40 }} shadows>
      <CharPresention2 />
      <Ground />
      <OrbitControls minDistance={4} maxDistance={30} enableRotate={true}/>
    </Canvas>
  );
}
export function FiberContainer3() {
  return (
    <Canvas camera={{ position: [14.4666, 2.0365, 5.556165], fov: 40 }} shadows>
      <CharPresention3 />
      <Ground />
      <OrbitControls minDistance={4} maxDistance={30} enableRotate={true}/>
    </Canvas>
  );
}