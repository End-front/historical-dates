import { cn } from '../../shared/lib/cn';

import { ArrowDownIcon } from './icons';
import styles from './timeline.module.scss';

export function Indicator({
  className,
  style,
  current,
  end,
}: {
  className?: string;
  style?: React.CSSProperties;
  current: number;
  end: number;
}) {
  const formattedCurrent = current.toString().padStart(2, '0');
  const formattedEnd = end.toString().padStart(2, '0');

  return (
    <div className={cn(styles.indicator, className)} style={style}>
      <span>{formattedCurrent}</span>/<span>{formattedEnd}</span>
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
  renderItem,
}: {
  className?: string;
  style?: React.CSSProperties;
  length: number;
  current: number;
  renderItem: ({ index, isActive }: { index: number; isActive: boolean }) => React.ReactNode;
}) {
  return (
    <div className={cn(styles.paginationRow, className)} style={style}>
      {Array.from({ length }).map((_, index) => renderItem({ index, isActive: index === current }))}
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
