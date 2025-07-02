import * as React from 'react';
import { Container } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import SettingChart from './SettingChart';
import { tGroup } from '../groupdata';

type tSeries = {
  'Максимальная высота': boolean,
  'Средняя высота': boolean,
  'Минимальная высота': boolean,
};

type GroupChartProps = {
  data: tGroup;
};

function GroupChart({ data }: GroupChartProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const chartSetting = {
    yAxis: [{ label: 'Высота (м)', labelStyle: { transform: 'translateX(-10px)' } }],
    height: 400,
  };

  const seriesY = Object.entries(series)
    .filter(([_, show]) => show)
    .map(([key]) => ({
      dataKey: key,
      label: key,
    }));

  const showLabels = seriesY.length === 1;

  return (
    <Container maxWidth="lg" sx={{ my: 3 }}>
      {/* Сначала диаграмма */}
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          barLabel={showLabels ? 'value' : undefined}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          {...chartSetting}
        />
      )}

      {/* Потом настройки под диаграммой */}
      <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
    </Container>
  );

}

export default GroupChart;
