import React, { FC, useRef } from "react";
import * as THREE from "three";

export const LightSource: FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, -0.2, 0]}
        intensity={10}
        color={"gold"}
      />
      {lightRef.current && (
        <primitive object={new THREE.PointLightHelper(lightRef.current, 0.1)} />
      )}
    </>
  );
};
