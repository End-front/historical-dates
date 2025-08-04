import { useMediaQuery } from '../shared/lib/react';
import { MEDIA_VALUES } from '../shared/model/media-query';

import { DesktopSection } from './composition/desktop';
import { MobileSection } from './composition/mobile';
import { type TimelineContent, useTab } from './model/use-tab';
import { AnimateTimelineProvider, useTimelineModel } from './view-model/use-animate-timeline';

export function TimelineSliderSection() {
  const isDesktop = useMediaQuery(`(min-width: ${MEDIA_VALUES.lg}px)`);

  const tabModel = useTab(STATIC_CONTENT);
  const timelineModel = useTimelineModel({
    onMiddle: () => tabModel.endTransition(),
  });

  const tabModelWithTimeline = {
    ...tabModel,
    toTab: (index: number) => {
      tabModel.toTab(index);

      timelineModel?.invalidate();
      timelineModel?.restart(true);
    },
  };

  if (isDesktop) {
    return (
      <AnimateTimelineProvider timeline={timelineModel}>
        <DesktopSection
          tabModel={tabModelWithTimeline}
          style={{
            flexGrow: 1,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        />
      </AnimateTimelineProvider>
    );
  }

  return (
    <AnimateTimelineProvider timeline={timelineModel}>
      <MobileSection
        tabModel={tabModelWithTimeline}
        style={{
          flexGrow: 1,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      />
    </AnimateTimelineProvider>
  );
}

const STATIC_CONTENT: TimelineContent[] = [
  {
    range: {
      start: 1980,
      end: 1986,
    },
    folderTitle: 'Технологии',
    folder: [
      {
        title: '1980',
        description: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      },
      {
        title: '1981',
        description:
          'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
      },
      {
        title: '1982',
        description: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
      },
      {
        title: '1983',
        description:
          'В 2018 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1',
      },
      {
        title: '1984',
        description:
          'В 2019 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1',
      },
      {
        title: '1985',
        description:
          'В 2020 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1',
      },
      {
        title: '1986',
        description: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
      },
    ],
  },
  {
    range: {
      start: 1987,
      end: 1991,
    },
    folderTitle: 'Кино',
    folder: [
      {
        title: '1987',
        description: 'Новый космический телескоп позволил учёным обнаружить загадочную планету в созвездии Ориона',
      },
      {
        title: '1988',
        description:
          'В ходе археологических раскопок обнаружены древние рукописи, содержащие неизвестные математические формулы',
      },
      {
        title: '1989',
        description: 'Группа биологов открыла новый вид глубоководных существ, способных вырабатывать биолюминесценцию',
      },
      {
        title: '1990',
        description: 'Ученые разработали революционный метод получения чистой энергии из атмосферного воздуха',
      },
      {
        title: '1991',
        description: 'Российские инженеры представили прототип летающего автомобиля с вертикальным взлетом и посадкой',
      },
    ],
  },
  {
    range: {
      start: 1992,
      end: 1997,
    },
    folderTitle: 'Литература',
    folder: [
      {
        title: '1992',
        description: 'Международная экспедиция обнаружила следы древней цивилизации в джунглях Амазонки',
      },
      {
        title: '1993',
        description: 'Создан первый квантовый процессор, способный работать при комнатной температуре',
      },
      {
        title: '1994',
        description: 'Астрономы зафиксировали необычные сигналы, исходящие из центра нашей галактики',
      },
      {
        title: '1995',
        description: 'Разработана новая технология трехмерной печати органов из стволовых клеток пациента',
      },
      {
        title: '1996',
        description: 'Найдены доказательства существования параллельных вселенных благодаря новому коллайдеру',
      },
      {
        title: '1997',
        description: 'В Сибири обнаружено крупнейшее месторождение редкоземельных металлов',
      },
    ],
  },
  {
    range: {
      start: 1998,
      end: 2005,
    },
    folderTitle: 'Игры',
    folder: [
      {
        title: '1998',
        description: 'Создана первая в мире нейронная сеть, полностью имитирующая работу человеческого мозга',
      },
      {
        title: '1999',
        description: 'Запущен проект по восстановлению исчезнувших видов животных с помощью генной инженерии',
      },
      {
        title: '2000',
        description:
          'Разработан новый тип солнечных батарей с рекордным показателем эффективности преобразования энергии',
      },
      {
        title: '2001',
        description: 'Открыт способ мгновенной передачи данных, использующий принцип квантовой телепортации',
      },
    ],
  },
  {
    range: {
      start: 2006,
      end: 2014,
    },
    folderTitle: 'Спорт',
    folder: [
      {
        title: '2006',
        description: 'Создана универсальная вакцина, способная защитить от всех известных штаммов гриппа',
      },
      {
        title: '2007',
        description:
          'Построен первый город с полностью автономной системой энергоснабжения из возобновляемых источников',
      },
      {
        title: '2008',
        description: 'Ученые научились управлять погодой в пределах небольших территорий без вреда для экосистемы',
      },
      {
        title: '2009',
        description:
          'Разработана технология очистки мирового океана от пластикового мусора с помощью автономных дронов',
      },
      {
        title: '2010',
        description: 'Создан материал, способный восстанавливать свою структуру после механических повреждений',
      },
    ],
  },
  {
    range: {
      start: 2015,
      end: 2022,
    },
    folderTitle: 'Наука',
    folder: [
      {
        title: '2015',
        description: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
      },
      {
        title: '2016',
        description:
          'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11',
      },
      {
        title: '2017',
        description: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi',
      },
      {
        title: '2018',
        description:
          'В 2018 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1',
      },
      {
        title: '2019',
        description:
          'В 2019 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1',
      },
      {
        title: '2020',
        description:
          'В 2020 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1',
      },
    ],
  },
];
