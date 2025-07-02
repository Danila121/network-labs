import * as React from 'react';
import { Container } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import SettingChart from './SettingChart';

type Car = {
  Название: string;
  Цена: number;
  Мощность: number;
  'Макс. скорость': number;
  'Разгон 0-100': number;
};

type Props = {
  data: Car[];
};

type tSeries = {
  Цена: boolean;
  Мощность: boolean;
  'Макс. скорость': boolean;
  'Разгон 0-100': boolean;
};

function CarsChart({ data }: Props) {
  const [series, setSeries] = React.useState<tSeries>({
    Цена: true,
    Мощность: false,
    'Макс. скорость': false,
    'Разгон 0-100': false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const chartSetting = {
    yAxis: [{ label: '', labelStyle: { fill: '#fff' }, tickLabelStyle: { fill: '#fff' } }],
    xAxis: [{ scaleType: 'band' as const, dataKey: 'Название', tickLabelStyle: { fill: '#fff' } }],
    height: 420,
  };

  const selectedSeries = Object.entries(series)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => ({ dataKey: key, label: key }));

  const baseProps = {
    dataset: data,
    series: selectedSeries,
    ...chartSetting,
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {isBar ? <BarChart {...baseProps} /> : <LineChart {...baseProps} />}
      <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
    </Container>
  );
}

export default CarsChart;
