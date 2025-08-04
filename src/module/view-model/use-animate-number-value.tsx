import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

export function useAnimateNumberValue({
  value,
  addAnimation,
}: {
  value: number;
  addAnimation: (animation: gsap.core.Tween) => void;
}) {
  const [currentValue, setCurrentValue] = useState(Math.max(value - 30, 0));
  const currentValueRef = useRef(currentValue);

  useGSAP(() => {
    addAnimation(
      gsap.to(currentValueRef, {
        current: value,
        duration: 0.8,
        onUpdate: function () {
          setCurrentValue(Math.round(currentValueRef.current));
        },
      }),
    );
  }, [addAnimation, value]);

  return currentValue.toString().padStart(4, '0');
}
