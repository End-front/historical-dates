import { cn } from '../../shared/lib/cn';

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
  renderItem: ({
    index,
    isActive,
    x,
    y,
  }: {
    index: number;
    isActive: boolean;
    x: number;
    y: number;
  }) => React.ReactNode;
}) {
  const getPosition = (index: number) => {
    const startAngleOffset = (60 * Math.PI) / 180;
    const angle = (2 * Math.PI * index) / length - startAngleOffset;
    const x = Math.cos(angle);
    const y = Math.sin(angle);

    return { x, y };
  };

  return (
    <div className={cn(styles.paginationCircle, className)} style={style}>
      <div className={styles.paginationCircleInner} />
      {Array.from({ length }).map((_, index) => {
        const { x, y } = getPosition(index);
        return renderItem({ index, isActive: index === current, x, y });
      })}
    </div>
  );
}

PaginationCircle.Item = function PaginationCircleItem({
  order,
  x,
  y,
  className,
  style,
  isActive,
  onSelect,
  children,
}: {
  order: number;
  x: number;
  y: number;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  onSelect?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(styles.paginationCircleItem, isActive && styles.paginationCircleItemActive, className)}
      style={
        {
          ...style,
          '--transform': `translate(calc(var(--radius) * ${x}), calc(var(--radius) * ${y}))`,
        } as React.CSSProperties
      }
    >
      <button className={styles.paginationCircleItemContent} onClick={onSelect}>
        {order}
      </button>
      {children}
    </div>
  );
};
