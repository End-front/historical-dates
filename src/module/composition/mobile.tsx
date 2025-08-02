import { type TabModel } from '../model/use-tab';
import { Layout } from '../ui/layout';
import { Slider } from '../ui/slider';
import { Controls, Indicator, PaginationRow } from '../ui/timeline';

export function MobileSection({
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
      header={
        <Layout.TitleSection style={{ marginBottom: 56 }}>
          Исторические
          <br />
          даты
        </Layout.TitleSection>
      }
      timeline={
        <Layout.TitleRange style={{ marginBottom: 30 }}>
          <Layout.LabelRange value={tabModel.currentContent.range.start} style={{ color: 'var(--primary)' }} />
          <Layout.LabelRange value={tabModel.currentContent.range.end} style={{ color: 'var(--secondary)' }} />
        </Layout.TitleRange>
      }
      folder={
        <>
          <Layout.TitleFolder>{tabModel.currentContent.folderTitle}</Layout.TitleFolder>
          <Layout.Divider />
          <Slider key={tabModel.currentIndex} style={{ marginBottom: 30 }}>
            {tabModel.currentContent.folder.map(({ title, description }, index) => (
              <Slider.Item key={index} year={title} description={description} />
            ))}
          </Slider>
        </>
      }
      footer={
        <>
          <Indicator current={tabModel.currentIndex + 1} max={tabModel.maxIndex + 1} style={{ marginBottom: 10 }} />
          <Layout.FooterColumns
            left={
              <Controls
                disabledPrev={!tabModel.canPrev}
                onPrev={tabModel.prevTab}
                disabledNext={!tabModel.canNext}
                onNext={tabModel.nextTab}
              />
            }
            center={
              <PaginationRow
                current={tabModel.currentIndex}
                length={tabModel.maxIndex + 1}
                renderItem={({ index, isActive }) => (
                  <PaginationRow.Item key={index} isActive={isActive} onSelect={() => tabModel.toTab(index)} />
                )}
                style={{
                  marginTop: 4,
                }}
              />
            }
          />
        </>
      }
    />
  );
}
