import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface RewardProps {
  position: { x: number; y: number; z: number };
  endPosition: { x: number; y: number; z: number };
  imgUrl?: string;
}

export const Reward: React.FC<RewardProps> = ({
  position,
  endPosition,
  imgUrl,
}) => {
  const uniqueId = `${position.x}${endPosition.x}${position.y}${endPosition.y}`;
  const rewardRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(
    THREE.TextureLoader,
    "https://api.dicebear.com/9.x/icons/svg?seed=" + uniqueId,
  );

  useEffect(() => {
    if (rewardRef.current) {
      // Initial position (inside the lootbox)
      rewardRef.current.position.set(position.x, position.y, position.z);
    }
  }, [position]);

  useFrame((state, delta) => {
    if (!rewardRef.current) return;

    // Animate the reward to move upwards
    rewardRef.current.position.y += delta * endPosition.y; // Adjust speed as needed
    rewardRef.current.position.x += delta * endPosition.x; // Adjust speed as needed
    rewardRef.current.position.z += delta * endPosition.z; // Adjust speed as needed
    if (rewardRef.current.position.y > endPosition.y) {
      const { x, y, z } = endPosition;
      rewardRef.current.position.y = y; // Stop at certain height
      rewardRef.current.position.x = x; // Stop at certain height
      rewardRef.current.position.z = z; // Stop at certain height
    }

    const time = state.clock.getElapsedTime();
    rewardRef.current.rotation.x = Math.sin(time * 0.5) * 0.1; // Slight oscillation
    rewardRef.current.rotation.y = Math.cos(time * 0.5) * 0.1;
  });

  return (
    <mesh ref={rewardRef}>
      <planeGeometry args={[0.5, 0.5]} /> {/* Adjust size as needed */}
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};
