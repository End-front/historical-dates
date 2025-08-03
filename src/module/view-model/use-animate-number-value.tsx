import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

export function useAnimateNumberValue(value: number) {
  const [currentValue, setCurrentValue] = useState(Math.max(value - 200, 0));

  const animatingValue = useRef(currentValue);
  useGSAP(() => {
    gsap.to(animatingValue, {
      current: value,
      duration: 0.8,
      onUpdate: function () {
        setCurrentValue(Math.round(animatingValue.current));
      },
    });
  }, [value]);

  return currentValue.toString().padStart(4, '0');
}
