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
  const currentContent = tabModel.getContent(tabModel.currentIndex);
  const deferredContent = tabModel.getContent(tabModel.deferredIndex ?? tabModel.currentIndex);

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
          <Layout.LabelRange value={currentContent.range.start} style={{ color: 'var(--primary)' }} />
          <Layout.LabelRange value={currentContent.range.end} style={{ color: 'var(--secondary)' }} />
        </Layout.TitleRange>
      }
      folder={
        <Layout.FolderWrapper animateType={tabModel.deferredIndex === null ? 'enter' : 'exit'}>
          <Layout.TitleFolder>{deferredContent.folderTitle}</Layout.TitleFolder>
          <Layout.Divider />
          <Slider key={tabModel.deferredIndex ?? tabModel.currentIndex} style={{ marginBottom: 30 }}>
            {deferredContent.folder.map(({ title, description }, index) => (
              <Slider.Item key={index} year={title} description={description} />
            ))}
          </Slider>
        </Layout.FolderWrapper>
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
                onSelect={tabModel.toTab}
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
