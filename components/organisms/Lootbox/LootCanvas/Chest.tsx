import React, { useEffect, useState } from "react";
import { PrimitiveProps } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export enum ANIMATIONS {
  IDLE = "Armature|Animated PBR Chest _Idle",
  UNCOMMON = "Armature|Animated PBR Chest _Opening_UnCommon",
  PRESS = "Armature|Animated PBR Chest _Press",
  START = "Armature|Animated PBR Chest _Start",
}

const anis = [
  ANIMATIONS.START,
  ANIMATIONS.IDLE,
  ANIMATIONS.PRESS,
  // ANIMATIONS.UNCOMMON,
];

type ExtraProps = {
  onRewardVisible: () => void;
};
export function Chest(props?: Omit<PrimitiveProps, "object"> & ExtraProps) {
  const [index, setIndex] = useState(0);
  const { scene, animations } = useGLTF("/demo-runepunk/models/lootbox.glb");
  const { actions } = useAnimations(animations, scene);
  // const currentAnimation = ANIMATIONS.START;
  // const currentAnimation =
  //   ANIMATIONS[props?.currentAnimation as keyof typeof ANIMATIONS];
  const offset = index % anis.length;
  const currentAnimation = anis[offset];

  const onAnimationComplete = () => {
    setTimeout(() => setIndex((prev) => prev + 1), 800);
  };

  useEffect(() => {
    if (actions) {
      Object.keys(actions).forEach((name) => {
        if (name !== currentAnimation) return;
        const action = actions[currentAnimation];
        const actionIndex = anis.indexOf(currentAnimation);
        const prevActionName =
          actionIndex > 0 ? anis[actionIndex - 1] : undefined;
        const prevAction = prevActionName ? actions[prevActionName] : undefined;

        if (!action) return;
        // Define the callback
        const onComplete = (event: THREE.Event) => {
          if ((event as any).action === action) {
            onAnimationComplete();
          }
        };
        action.getMixer().addEventListener("finished", onComplete);
        action?.setLoop(THREE.LoopOnce, 1);
        if (actionIndex === 2) {
          action.getMixer().removeEventListener("finished", onComplete);
          action
            ?.reset()
            .play()
            .crossFadeFrom(prevAction as THREE.AnimationAction, 0.5, false)
            .play();
          props?.onRewardVisible();
        } else {
          action?.reset()?.play();
        }

        action.clampWhenFinished = true;
      });
      // Play all animations or specify a particular one
      // Object.values(actions).forEach((action) => action.play());
    }
  }, [actions, currentAnimation]);

  return <primitive object={scene} {...props} />;
}
