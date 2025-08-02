import { useLayoutEffect, useState } from 'react';

export function useEqualColumns(...elementRefs: React.RefObject<HTMLElement | null>[]) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const updateWidth = () => {
      const newWidth = Math.max(...elementRefs.map((ref) => ref.current?.scrollWidth || 0));
      setWidth(newWidth);
    };

    const observer = new ResizeObserver(updateWidth);

    elementRefs.forEach(({ current: el }) => el && observer.observe(el));
    updateWidth();
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...elementRefs]);

  return width;
}
