import { Layout } from '../ui/layout';
import { Slider } from '../ui/slider';
import { Controls, Indicator, PaginationRow } from '../ui/timeline';

export function MobileSection() {
  return (
    <Layout
      header={
        <Layout.TitleSection style={{ marginBottom: 56 }}>
          Исторические
          <br />
          даты
        </Layout.TitleSection>
      }
      timeline={
        <Layout.TitleRange style={{ marginBottom: 56 }}>
          <Layout.LabelRange value={2015} style={{ color: 'var(--primary)' }} />
          <Layout.LabelRange value={2022} style={{ color: 'var(--secondary)' }} />
        </Layout.TitleRange>
      }
      folder={
        <>
          <Layout.TitleFolder>Наука</Layout.TitleFolder>
          <Layout.Divider />
          <Slider style={{ marginBottom: 56 }}>
            <Slider.Item
              year={2015}
              description="13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды"
            />
            <Slider.Item
              year={2016}
              description="Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11"
            />
            <Slider.Item
              year={2017}
              description="В 2017 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1"
            />
            <Slider.Item
              year={2018}
              description="В 2018 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1"
            />
            <Slider.Item
              year={2019}
              description="В 2019 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1"
            />
            <Slider.Item
              year={2020}
              description="В 2020 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1"
            />
            <Slider.Item
              year={2021}
              description="В 2021 году впервые была обнаружена планета за пределами Солнечной системы, получившая обозначение TRAPPIST-1"
            />
          </Slider>
        </>
      }
      footer={
        <>
          <Indicator current={1} end={3} style={{ marginBottom: 10 }} />
          <Layout.FooterColumns
            left={<Controls />}
            center={
              <PaginationRow
                length={3}
                current={1}
                renderItem={({ index, isActive }) => (
                  <PaginationRow.Item key={index} isActive={isActive} onSelect={() => console.log(index)} />
                )}
                style={{
                  marginTop: 4,
                }}
              />
            }
          />
        </>
      }
      style={{
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    />
  );
}
