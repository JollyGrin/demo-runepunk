import { Canvas } from "@react-three/fiber";
import { Chest } from "./Chest";
import { Reward } from "./Reward";
import { CameraControls } from "./CameraControls";
import { useDisclosure } from "@chakra-ui/react";
import { LightSource } from "./LightSource";
import { Sparkles, SpotLight } from "@react-three/drei";

const RewardPositions = [
  { x: 0, y: 0.7, z: 0.1 },
  { x: 0.6, y: 0.7, z: 0.1 },
  { x: -0.6, y: 0.7, z: 0.1 },

  { x: 0, y: 1.25, z: 0.1 },
  { x: 0.6, y: 1.25, z: 0.1 },
  { x: -0.6, y: 1.25, z: 0.1 },
];

export function LootCanvas(props: { rewards?: number }) {
  const scale = 0.5;
  const { isOpen: isRewardVisible, onOpen: onRewardVisible } = useDisclosure();

  return (
    <Canvas style={{ height: "100vh", width: "100vw" }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[10, 10, 10]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <mesh
        receiveShadow
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={10}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
      {isRewardVisible && (
        <group>
          <Rewards length={props.rewards ?? 1} />
        </group>
      )}

      <Chest
        scale={[scale, scale, scale]}
        position={[0, -0.5, 0]}
        castShadow
        onRewardVisible={onRewardVisible}
      />

      <Sparkles speed={0.22} size={5} opacity={0.2} />
      <LightSource />
      {isRewardVisible && (
        <SpotLight
          position={[0, -0.3, 0]}
          distance={3}
          angle={0.35}
          attenuation={1}
          anglePower={0.2} // Diffuse-cone anglePower (default: 5)
        />
      )}
      <CameraControls />
    </Canvas>
  );
}

const Rewards = ({ length = 1 }: { length: number }) => {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <Reward
          key={i + "rewardpane"}
          position={{ x: 0, y: 0, z: 0.1 - length * 0.01 }}
          endPosition={RewardPositions[i]}
        />
      ))}
    </>
  );
};
