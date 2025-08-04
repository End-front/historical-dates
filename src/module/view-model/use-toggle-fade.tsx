import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

export function useToggleFade({
  addExitAnimation,
  addEnterAnimation,
}: {
  addExitAnimation: (animation: gsap.core.Tween) => void;
  addEnterAnimation: (animation: gsap.core.Tween) => void;
}) {
  const [opacity, setOpacity] = useState(1);
  const opacityRef = useRef(opacity);
  const isFirstAnimation = useRef(true);

  useGSAP(
    () => {
      addExitAnimation(
        gsap.to(opacityRef, {
          current: () => {
            if (isFirstAnimation.current) {
              isFirstAnimation.current = false;
              return 1;
            }

            return 0;
          },
          duration: 0.2,
          ease: 'power1.out',
          onUpdate: function () {
            setOpacity(opacityRef.current);
          },
        }),
      );
      addEnterAnimation(
        gsap.to(opacityRef, {
          current: 1,
          duration: 0.2,
          ease: 'power1.out',
          onUpdate: function () {
            setOpacity(opacityRef.current);
          },
        }),
      );
    },
    { dependencies: [addExitAnimation, addEnterAnimation], revertOnUpdate: true },
  );

  return opacity;
}
