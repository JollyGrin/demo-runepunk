import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particleCount = 100;
const particleSpeed = 0.02;

export const Particles: React.FC = () => {
  const particleRef = useRef<THREE.Points>(null);

  // Create particles
  const particles = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particles[i * 3] = Math.random() - 0.5; // x
    particles[i * 3 + 1] = Math.random() * 0.7; // y
    particles[i * 3 + 2] = Math.random() - 0.5; // z
  }

  useFrame((state, delta) => {
    if (!particleRef.current) return;

    // Update particles
    const positions = particleRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += particleSpeed * delta;
      if (positions[i * 3 + 1] > 0.7) {
        positions[i * 3 + 1] = 0;
      }
    }
    particleRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particleRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          itemSize={3}
          count={particleCount}
        />
      </bufferGeometry>
      <pointsMaterial color={"#ffffff"} size={0.05} />
    </points>
  );
};
