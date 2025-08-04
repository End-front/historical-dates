import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { createStrictContext, useStrictContext } from '../../shared/lib/react';

type TimelineContext = {
  addToStart: (animation: gsap.core.Tween) => void;
  addToMiddle: (animation: gsap.core.Tween) => void;
};
const AnimateTimelineContext = createStrictContext<TimelineContext>();

export function useTimelineModel({ onMiddle }: { onMiddle?: () => void } = {}) {
  const [timeline, setTimeline] = useState<gsap.core.Timeline>();

  const onMiddleRef = useRef(onMiddle);
  useLayoutEffect(() => {
    onMiddleRef.current = onMiddle;
  }, [onMiddle]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.addLabel('start', 0);
      tl.addLabel('middle', 0.6);

      tl.call(() => onMiddleRef.current?.(), [], 'middle');

      setTimeline(tl);
    },
    { revertOnUpdate: true },
  );

  return timeline;
}

export function AnimateTimelineProvider({
  timeline,
  children,
}: {
  timeline: gsap.core.Timeline | undefined;
  children: React.ReactNode;
}) {
  const contextValue: TimelineContext = useMemo(
    () => ({
      addToStart: (animation) => timeline?.add(animation, 'start'),
      addToMiddle: (animation) => timeline?.add(animation, 'middle'),
    }),
    [timeline],
  );

  return <AnimateTimelineContext value={contextValue}>{children}</AnimateTimelineContext>;
}

export function useAnimateTimeline() {
  return useStrictContext(AnimateTimelineContext);
}
