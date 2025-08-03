import { useRef } from 'react';

import { cn } from '../../shared/lib/cn';
import { useAnimatePositionByRadian } from '../view-model/use-animate-position-by-radian';

import { ArrowDownIcon } from './icons';
import styles from './timeline.module.scss';

export function Indicator({
  className,
  style,
  current,
  max,
}: {
  className?: string;
  style?: React.CSSProperties;
  current: number;
  max: number;
}) {
  const formattedCurrent = current.toString().padStart(2, '0');
  const formattedMax = max.toString().padStart(2, '0');

  return (
    <div className={cn(styles.indicator, className)} style={style}>
      <span>{formattedCurrent}</span>/<span>{formattedMax}</span>
    </div>
  );
}

export function Controls({
  className,
  style,
  disabledPrev,
  disabledNext,
  onPrev,
  onNext,
}: {
  className?: string;
  style?: React.CSSProperties;
  disabledPrev?: boolean;
  onPrev?: () => void;
  disabledNext?: boolean;
  onNext?: () => void;
}) {
  return (
    <div className={cn(styles.controls, className)} style={style}>
      <button
        className={cn(styles.control, styles.controlPrev)}
        disabled={disabledPrev}
        onClick={onPrev}
        aria-label="Назад"
      >
        <ArrowDownIcon />
      </button>
      <button
        className={cn(styles.control, styles.controlNext)}
        disabled={disabledNext}
        onClick={onNext}
        aria-label="Вперёд"
      >
        <ArrowDownIcon />
      </button>
    </div>
  );
}

export function PaginationRow({
  className,
  style,
  length,
  current,
  onSelect,
}: {
  className?: string;
  style?: React.CSSProperties;
  length: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className={cn(styles.paginationRow, className)} style={style}>
      {Array.from({ length }).map((_, index) => (
        <PaginationRow.Item key={index} isActive={index === current} onSelect={() => onSelect(index)} />
      ))}
    </div>
  );
}

PaginationRow.Item = function PaginationRowItem({
  className,
  style,
  isActive,
  onSelect,
}: {
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      className={cn(styles.paginationRowItem, isActive && styles.paginationRowItemActive, className)}
      style={style}
      onClick={onSelect}
    />
  );
};

export function PaginationCircle({
  className,
  style,
  length,
  current,
  renderItem,
}: {
  className?: string;
  style?: React.CSSProperties;
  length: number;
  current: number;
  renderItem: (args: { index: number; isActive: boolean; radian: number }) => React.ReactNode;
}) {
  const getRadian = (index: number) => {
    const startRadianOffset = (60 * Math.PI) / 180;
    const radian = (2 * Math.PI * (index - current)) / length - startRadianOffset;

    return radian;
  };

  return (
    <div className={cn(styles.paginationCircle, className)} style={style}>
      <div className={styles.paginationCircleInner} />
      {Array.from({ length }).map((_, index) =>
        renderItem({ index, isActive: index === current, radian: getRadian(index) }),
      )}
    </div>
  );
}

PaginationCircle.Item = function PaginationCircleItem({
  order,
  radian,
  className,
  style,
  isActive,
  onSelect,
  children,
}: {
  order: number;
  radian: number;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  onSelect?: () => void;
  children?: React.ReactNode;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useAnimatePositionByRadian(elementRef, radian);

  return (
    <div
      ref={elementRef}
      className={cn(styles.paginationCircleItem, isActive && styles.paginationCircleItemActive, className)}
      style={style}
    >
      <button className={styles.paginationCircleItemContent} onClick={onSelect}>
        {order}
      </button>
      {children}
    </div>
  );
};
