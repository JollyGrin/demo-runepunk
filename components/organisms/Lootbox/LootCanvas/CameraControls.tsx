import React, { useEffect, useRef, useState } from "react";
import { Canvas, PrimitiveProps, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  OrbitControlsProps,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { ANIMATIONS, Chest } from "./Chest";
import { Reward } from "./Reward";

type XYZ = { x: number; y: number; z: number };
export function CameraControls(props: { target?: XYZ }) {
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
        //@ts-ignore: todo fix type
        controls.current.target = interpolatedPosition;

        frameCount++;
        if (frameCount > totalFrames) {
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
    }
  }, [props.target]);

  return (
    <OrbitControls
      //@ts-ignore: todo fix type
      ref={controls}
      args={[camera, domElement]}
      enableRotate={true}
      enableP
      minPolarAngle={Math.PI / 2.8}
      maxPolarAngle={Math.PI / 1.7}
      // minAzimuthAngle={Math.PI / 1.5}
      // maxAzimuthAngle={Math.PI / 1.8}
      enablePan={false}
      enableZoom={false}
      // maxZoom={100}
      // minZoom={1}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: undefined,
        RIGHT: undefined,
      }}
    />
  );
}
