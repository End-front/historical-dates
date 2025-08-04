import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

export function useFadeText({
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

  useGSAP(() => {
    if (!visible) {
      addExitAnimation(
        gsap.to(opacityRef, {
          current: 0,
          duration: 0.2,
          ease: 'power1.out',
          onUpdate: function () {
            setOpacity(opacityRef.current);
          },
        }),
      );
    } else {
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
    }
  }, [addEnterAnimation, addExitAnimation, visible]);

  return opacity;
}
