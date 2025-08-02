import { useCallback, useRef, useState } from 'react';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper/types';

import { cn } from '../../shared/lib/cn';
import { useMediaQuery } from '../../shared/lib/react';
import { MEDIA_VALUES } from '../../shared/model/media-query';

import { ArrowDownIcon } from './icons';
import styles from './slider.module.scss';

import 'swiper/scss';

const BREAKPOINTS_SETUP_SWIPER: SwiperOptions['breakpoints'] = {
  0: {
    spaceBetween: 24,
  },
  [MEDIA_VALUES.sm]: {
    spaceBetween: 24,
  },
  [MEDIA_VALUES.md]: {
    spaceBetween: 40,
  },
  [MEDIA_VALUES.lg]: {
    spaceBetween: 60,
  },
  [MEDIA_VALUES.xl]: {
    spaceBetween: 80,
  },
};

export function Slider({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const swiperInstanceRef = useRef<Swiper | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const refCallback = useCallback<React.RefCallback<HTMLDivElement>>((el) => {
    if (!el) return;

    const swiper = new Swiper(el, {
      slidesPerView: 'auto',
      breakpoints: BREAKPOINTS_SETUP_SWIPER,
    });
    swiperInstanceRef.current = swiper;

    const handleSlideChange = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    handleSlideChange();
    swiper.on('slideChange', handleSlideChange);

    return () => {
      swiper.destroy(true, true);
    };
  }, []);

  swiperInstanceRef.current?.update();

  return (
    <div className={cn(styles.slider, className)} style={style}>
      <div ref={refCallback} className={cn('swiper', styles.swiper)}>
        <div className="swiper-wrapper">{children}</div>
      </div>
      <NavigationPrev isDisabled={isBeginning} onClick={() => swiperInstanceRef.current?.slidePrev()} />
      <NavigationNext isDisabled={isEnd} onClick={() => swiperInstanceRef.current?.slideNext()} />
    </div>
  );
}

Slider.Item = function SlideItem({
  className,
  style,
  year,
  description,
}: {
  className?: string;
  style?: React.CSSProperties;
  year?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className={cn('swiper-slide', styles.slideItem, className)} style={style}>
      <h4 className={styles.slideItemTitle}>{year}</h4>
      <p className={styles.slideItemDescription}>{description}</p>
    </div>
  );
};

function NavigationPrev({
  className,
  style,
  isDisabled,
  onClick,
}: {
  className?: string;
  style?: React.CSSProperties;
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const isDesktop = useMediaQuery(`(min-width: ${MEDIA_VALUES.lg}px)`);

  if (!isDesktop) return null;
  return (
    <button
      className={cn(
        styles.navigationButton,
        styles.navigationPrev,
        isDisabled && styles.navigationButtonDisabled,
        className,
      )}
      style={style}
      onClick={onClick}
    >
      <ArrowDownIcon />
    </button>
  );
}

function NavigationNext({
  className,
  style,
  isDisabled,
  onClick,
}: {
  className?: string;
  style?: React.CSSProperties;
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const isDesktop = useMediaQuery(`(min-width: ${MEDIA_VALUES.lg}px)`);

  if (!isDesktop) return null;
  return (
    <button
      className={cn(
        styles.navigationButton,
        styles.navigationNext,
        isDisabled && styles.navigationButtonDisabled,
        className,
      )}
      style={style}
      onClick={onClick}
    >
      <ArrowDownIcon />
    </button>
  );
}
