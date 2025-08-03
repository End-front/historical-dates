import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export function useAnimatePositionByRadian(elementRef: React.RefObject<HTMLElement | null>, radian: number) {
  const animatingRadian = useRef(radian);

  useGSAP(() => {
    const { x, y } = getPosition(radian);

    gsap.set(elementRef.current, {
      '--x': x,
      '--y': y,
    });
  });
  useGSAP(() => {
    gsap.to(animatingRadian, {
      current: radian,
      duration: 1,
      ease: 'power2.out',
      onUpdate: function () {
        const { x, y } = getPosition(animatingRadian.current);

        gsap.set(elementRef.current, {
          '--x': x,
          '--y': y,
        });
      },
    });
  }, [radian]);
}

const getPosition = (radian: number) => {
  return {
    x: Math.cos(radian),
    y: Math.sin(radian),
  };
};
