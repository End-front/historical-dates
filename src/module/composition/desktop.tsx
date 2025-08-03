import type { TabModel } from '../model/use-tab';
import { Layout } from '../ui/layout';
import { Slider } from '../ui/slider';
import { Controls, Indicator, PaginationCircle } from '../ui/timeline';

export function DesktopSection({
  className,
  style,
  tabModel,
}: {
  className?: string;
  style?: React.CSSProperties;
  tabModel: TabModel;
}) {
  return (
    <Layout
      className={className}
      style={style}
      startContainer={
        <>
          <Layout.DecorLine type="vertical" style={{ top: 0, bottom: 0, left: 0 }} />
          <Layout.DecorLine type="vertical" style={{ top: 0, bottom: 0, left: '50%' }} />
          <Layout.DecorLine type="vertical" style={{ top: 0, bottom: 0, right: 0 }} />
        </>
      }
      header={
        <Layout.TitleSection>
          Исторические
          <br />
          даты
        </Layout.TitleSection>
      }
      timeline={
        <>
          <div style={{ position: 'relative', marginBottom: 90, marginTop: 90 }}>
            <Layout.DecorLine
              type="horizontal"
              style={{
                top: '50%',
                left: 'calc(var(--container-padding) * -1 + 1px)',
                right: 'calc(var(--container-padding) * -1 + 1px',
              }}
            />

            <Layout.TitleRange>
              <Layout.LabelRange value={tabModel.currentContent.range.start} style={{ color: 'var(--primary)' }} />
              <Layout.LabelRange value={tabModel.currentContent.range.end} style={{ color: 'var(--secondary)' }} />
            </Layout.TitleRange>
            <PaginationCircle
              current={tabModel.currentIndex}
              length={tabModel.maxIndex + 1}
              renderItem={({ index, isActive, radian }) => (
                <PaginationCircle.Item
                  key={index}
                  order={index + 1}
                  radian={radian}
                  isActive={isActive}
                  onSelect={() => tabModel.toTab(index)}
                >
                  <Layout.TitleFolder
                    style={{
                      position: 'absolute',
                      left: 'calc(100% + 20px)',
                      top: '50%',
                      transform: 'translate(0, -50%)',
                      display: !isActive ? 'none' : undefined,
                    }}
                  >
                    {tabModel.getFolderTitle(index)}
                  </Layout.TitleFolder>
                </PaginationCircle.Item>
              )}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </div>
          <Indicator current={tabModel.currentIndex + 1} max={tabModel.maxIndex + 1} style={{ marginBottom: 20 }} />
          <Controls
            disabledPrev={!tabModel.canPrev}
            onPrev={tabModel.prevTab}
            disabledNext={!tabModel.canNext}
            onNext={tabModel.nextTab}
          />
        </>
      }
      folder={
        <Slider key={tabModel.currentIndex} style={{ marginTop: 20 }}>
          {tabModel.currentContent.folder.map(({ title, description }, index) => (
            <Slider.Item key={index} year={title} description={description} />
          ))}
        </Slider>
      }
    />
  );
}
