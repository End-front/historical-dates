import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

export function useAnimatePositionByRadian({
  addAnimation,
  radian,
}: {
  addAnimation: (animation: gsap.core.Tween) => void;
  radian: number;
}) {
  const [position, setPosition] = useState(() => getPosition(radian));

  const animatingRadian = useRef(radian);
  useGSAP(
    () => {
      addAnimation(
        gsap.to(animatingRadian, {
          current: radian,
          immediateRender: true,
          duration: 0.8,
          ease: 'power1.out',
          onUpdate: function () {
            setPosition(getPosition(animatingRadian.current));
          },
        }),
      );
    },
    { dependencies: [addAnimation, radian], revertOnUpdate: true },
  );

  return position;
}

const getPosition = (radian: number) => {
  return {
    x: Math.cos(radian),
    y: Math.sin(radian),
  };
};
