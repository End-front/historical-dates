import { useState } from 'react';

export type TimelineContent = {
  range: {
    start: number;
    end: number;
  };
  folderTitle: string;
  folder: Array<{
    title: string;
    description: string;
  }>;
};

export function useTab(
  content: TimelineContent[],
  {
    onChange,
  }: {
    onChange?: () => void;
  } = {},
) {
  const [state, setState] = useState<{
    index: number;
    deferredIndex: number | null;
  }>({
    index: 0,
    deferredIndex: null,
  });
  const maxIndex = content.length - 1;

  const updateContent = async (newValue: number) => {
    setState((prev) => ({
      index: Math.max(0, Math.min(newValue, maxIndex)),
      deferredIndex: prev.deferredIndex ?? prev.index,
    }));
    onChange?.();
  };

  const endTransition = () => {
    setState((prev) => ({
      ...prev,
      deferredIndex: null,
    }));
  };

  return {
    currentIndex: state.index,
    deferredIndex: state.deferredIndex,
    maxIndex,
    getContent: (index: number) => content[index]!,
    canNext: state.index < maxIndex,
    canPrev: state.index > 0,
    prevTab: () => updateContent(state.index - 1),
    nextTab: () => updateContent(state.index + 1),
    toTab: updateContent,
    endTransition,
  };
}

export type TabModel = ReturnType<typeof useTab>;
