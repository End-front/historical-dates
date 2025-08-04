import { useRef } from 'react';

import { cn } from '../../shared/lib/cn';
import { useEqualColumns } from '../lib/use-equal-columns';
import { useAnimateNumberValue } from '../view-model/use-animate-number-value';
import { useAnimateTimeline } from '../view-model/use-animate-timeline';
import { useToggleFade } from '../view-model/use-toggle-fade';

import styles from './layout.module.scss';

export function Layout({
  className,
  style,
  startContainer,
  header,
  timeline,
  folder,
  footer,
}: {
  className?: string;
  style?: React.CSSProperties;
  startContainer?: React.ReactNode;
  header?: React.ReactNode;
  timeline?: React.ReactNode;
  folder?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className={cn(styles.layout, 'container', className)} style={style}>
      {startContainer}
      {header}
      {timeline}
      {folder}
      {footer}
    </section>
  );
}

Layout.FolderWrapper = function FolderWrapper({
  animateType,
  className,
  style,
  children,
}: {
  animateType?: 'exit' | 'enter';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const { addToStart, addToMiddle } = useAnimateTimeline();

  const opacity = useToggleFade({
    addExitAnimation: addToStart,
    addEnterAnimation: addToMiddle,
  });

  return (
    <div
      className={cn(styles.folderWrapper, className)}
      style={{ ...style, opacity, pointerEvents: animateType === 'enter' ? 'auto' : 'none' }}
    >
      {children}
    </div>
  );
};

Layout.DecorLine = function DecorLine({
  className,
  style,
  type,
}: {
  className?: string;
  style?: React.CSSProperties;
  type: 'vertical' | 'horizontal';
}) {
  return (
    <div
      className={cn(
        styles.decorLine,
        className,
        type === 'vertical' && styles.decorLineVertical,
        type === 'horizontal' && styles.decorLineHorizontal,
      )}
      style={style}
    />
  );
};

Layout.TitleSection = function TitleSection({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <h1 className={cn(styles.titleSection, className)} style={style}>
      {children}
    </h1>
  );
};

Layout.TitleRange = function TitleRange({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <h2 className={cn(styles.titleRange, className)} style={style}>
      {children}
    </h2>
  );
};

Layout.LabelRange = function LabelRange({
  className,
  style,
  value,
}: {
  className?: string;
  style?: React.CSSProperties;
  value: number;
}) {
  const { addToStart } = useAnimateTimeline();

  const formattedValue = useAnimateNumberValue({ value, addAnimation: addToStart });

  return (
    <span className={cn(styles.labelRange, className)} style={style}>
      {formattedValue}
    </span>
  );
};

Layout.TitleFolder = function TitleFolder({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <h3 className={cn(styles.titleFolder, className)} style={style}>
      {children}
    </h3>
  );
};

Layout.Divider = function Divider({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <hr className={cn(styles.divider, className)} style={style} />;
};

Layout.FooterColumns = function FooterColumns({
  className,
  style,
  left,
  center,
  right,
}: {
  className?: string;
  style?: React.CSSProperties;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const width = useEqualColumns(leftRef, rightRef);
  return (
    <div className={cn(styles.footerColumns, className)} style={style}>
      <div
        ref={leftRef}
        style={{
          minWidth: width,
          flexShrink: 0,
        }}
      >
        {left}
      </div>
      <div style={{ flexGrow: 1 }}>{center}</div>
      <div
        ref={rightRef}
        style={{
          minWidth: width,
          flexShrink: 0,
        }}
      >
        {right}
      </div>
    </div>
  );
};
