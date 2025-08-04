import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

export function useFadeBlock({
  visible,
  addExitAnimation,
  addEnterAnimation,
}: {
  visible: boolean;
  addExitAnimation: (animation: gsap.core.Tween) => void;
  addEnterAnimation: (animation: gsap.core.Tween) => void;
}) {
  const [opacity, setOpacity] = useState(visible ? 1 : 0);
  const opacityRef = useRef(opacity);

  useGSAP(
    () => {
      const animation = gsap.to(opacityRef, {
        current: visible ? 1 : 0,
        duration: 0.2,
        ease: 'power1.out',
        onUpdate: function () {
          setOpacity(opacityRef.current);
        },
      });

      if (visible) {
        addEnterAnimation(animation);
      } else {
        addExitAnimation(animation);
      }
    },
    { dependencies: [addExitAnimation, addEnterAnimation, visible], revertOnUpdate: true },
  );

  return opacity;
}
