import React, { useEffect, useRef, useState } from "react";
import { Canvas, PrimitiveProps, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, OrbitControlsProps, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/router";

function Model(props?: Omit<PrimitiveProps, "object">) {
  const { scene } = useGLTF("/models/map.glb");
  return <primitive object={scene} {...props} />;
}

type XYZ = { x: number; y: number; z: number };
export function GltfWrapper() {
  const [target, setTarget] = useState<XYZ>();
  const scale = 0.04;
  return (
    <Canvas style={{ height: "calc(100vh - 10rem)", width: "100vw" }} shadows>
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
      <Pin position={[0.02, 0.94, 0.8]} setTarget={setTarget} />
      <Pin position={[0.8, 0, 0.8]} setTarget={setTarget} />
      <Pin position={[-2, -1.7, 0.8]} setTarget={setTarget} />
      <Model
        scale={[scale, scale, scale]}
        rotation={[Math.PI / 2, 0, Math.PI / 100]}
        position={[0, 0, 0]}
        castShadow
      />

      <CameraControls target={target} />
    </Canvas>
  );
}

function CameraControls(props: { target?: XYZ }) {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef<OrbitControlsProps>();
  //@ts-ignore: todo fix type
  useFrame(() => controls.current.update());

  useEffect(() => {
    if (!camera) return;
    camera.zoom = 2;
    camera.updateProjectionMatrix();
  }, [controls]);

  useEffect(() => {
    //@ts-ignore: todo fix type
    if (props.target?.x > 0) {
      //@ts-ignore: todo fix type
      const { x, y, z } = props.target;
      const endZoom = new THREE.Vector3(x, y, z);

      // Smoothly transition camera position to zoom onto the clicked pin
      const startZoom = camera.position.clone();
      const distance = startZoom.distanceTo(endZoom);

      // Calculate total frames for smooth transition
      const totalFrames = Math.ceil(distance / 0.1);

      let frameCount = 0;
      const zoomInterval = setInterval(() => {
        const t = frameCount / totalFrames;
        const interpolatedPosition = startZoom.clone().lerp(endZoom, t);
        if (!controls.current?.target) {
          frameCount++;
          clearInterval(zoomInterval);
          return;
        }
        controls.current.target = interpolatedPosition;

        frameCount++;
        if (frameCount > totalFrames) {
          clearInterval(zoomInterval);
        }
      }, 16); // Adjust frame rate for smoothness (60fps)
    }
  }, [props.target]);

  return (
    <OrbitControls
      //@ts-ignore: todo fix type
      ref={controls}
      args={[camera, domElement]}
      enableRotate={true}
      minPolarAngle={Math.PI / 2}
      maxPolarAngle={Math.PI / 1.25}
      minAzimuthAngle={0}
      maxAzimuthAngle={0}
      enablePan={true}
      enableZoom={true}
      // maxZoom={3}
      // minZoom={5}
      mouseButtons={{
        LEFT: THREE.MOUSE.RIGHT,
        RIGHT: THREE.MOUSE.LEFT,
      }}
    />
  );
}

const Pin: React.FC<{ position: number[]; setTarget: (xyz: XYZ) => void }> = ({
  position,
  setTarget,
}) => {
  const { push } = useRouter();
  const { camera } = useThree();

  const meshRef = useRef<THREE.Mesh>(null);

  const [_, setClicked] = useState(false);

  const zoomSpeed = 0.1; // Adjust zoom speed here

  const maxZoomDistance = 2; // Maximum distance to zoom in

  const handlePinClick = () => {
    if (meshRef.current) {
      const { x, y, z } = meshRef.current.position;
      setTarget({ x, y, z });

      // Calculate target position for zoom
      const targetPosition = new THREE.Vector3(x, y, z);

      // Ensure camera is facing the pin
      camera.lookAt(targetPosition);

      // Calculate end zoom position
      const direction = new THREE.Vector3();
      // const worldSpace = camera.getWorldDirection(direction);
      const endZoom = targetPosition
        .clone()
        .add(direction.multiplyScalar(-maxZoomDistance));

      // Smoothly transition camera position to zoom onto the clicked pin
      const startZoom = camera.position.clone();
      const distance = startZoom.distanceTo(endZoom);

      // Calculate total frames for smooth transition
      const totalFrames = Math.ceil(distance / zoomSpeed);

      let frameCount = 0;
      const zoomInterval = setInterval(() => {
        const t = frameCount / totalFrames;
        const interpolatedPosition = startZoom.clone().lerp(endZoom, t);
        camera.position.copy(interpolatedPosition);

        frameCount++;
        if (frameCount > totalFrames) {
          push("/game");
          clearInterval(zoomInterval);

          // Center pin in the canvas after zooming
          // const { width, height } = gl.domElement.getBoundingClientRect();
          // const projectedPosition = targetPosition.project(camera);
          // const xOffset = (projectedPosition.x * width) / 2;
          // const yOffset = (-projectedPosition.y * height) / 2;

          // // Calculate delta pan based on the offset
          // const deltaPan = new THREE.Vector3(-xOffset, yOffset, 0);
          // camera.position.add(deltaPan);

          // setClicked(true); // Optional: Update state or trigger other effects
        }
      }, 16); // Adjust frame rate for smoothness (60fps)

      // Optional: Add animation or other effects during the zoom
      setClicked(true);
    }
  };

  return (
    <mesh
      ref={meshRef}
      //@ts-ignore: todo fix type
      position={position}
      scale={[0.08, 0.08, 0.08]}
      onClick={handlePinClick}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="aquamarine" />
    </mesh>
  );
};
