import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMemo, useState } from 'react';

import { createStrictContext, useStrictContext } from '../../shared/lib/react';

type TimelineContext = {
  addToStart: (animation: gsap.core.Tween) => void;
  addToMiddle: (animation: gsap.core.Tween) => void;
};
const AnimateTimelineContext = createStrictContext<TimelineContext>();

export function useTimelineModel() {
  const [timeline, setTimeline] = useState<gsap.core.Timeline>();

  const { contextSafe } = useGSAP();
  const createTimeline = contextSafe(() => {
    const tl = gsap.timeline();

    tl.addLabel('start', 0);
    tl.addLabel('middle', 0.6);

    return tl;
  });
  useGSAP(() => {
    setTimeline(createTimeline);
  });

  const reset = () => {
    timeline?.kill();

    setTimeline(createTimeline);
  };

  return {
    timeline,
    reset,
  };
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
