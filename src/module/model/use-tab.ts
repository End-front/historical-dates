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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const maxIndex = content.length - 1;

  return {
    currentIndex,
    maxIndex,
    getFolderTitle: (index: number) => content[index]!.folderTitle,
    currentContent: content[currentIndex]!,
    canNext: currentIndex < maxIndex,
    canPrev: currentIndex > 0,
    prevTab: () => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      onChange?.();
    },
    nextTab: () => {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      onChange?.();
    },
    toTab: (index: number) => {
      setCurrentIndex(Math.max(Math.min(index, maxIndex), 0));
      onChange?.();
    },
  };
}

export type TabModel = ReturnType<typeof useTab>;
