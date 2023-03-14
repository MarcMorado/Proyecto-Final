import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CharPresention } from "../components/charPresentation";
import { Ground } from "./Ground";

export function FiberContainer() {
  return (
    <Canvas camera={{ position: [14.4666, 2.0365, 5.556165], fov: 40 }} shadows>
      <CharPresention />
      <Ground />
      <OrbitControls minDistance={4} maxDistance={30} enableRotate={true}/>
    </Canvas>
  );
}