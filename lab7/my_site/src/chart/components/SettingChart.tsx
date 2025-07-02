import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

type tSeries = {
  Цена: boolean;
  Мощность: boolean;
  'Макс. скорость': boolean;
  'Разгон 0-100': boolean;
};

type Props = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: Props) {
  const handleChartType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(e.target.value === "bar");
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeries(prev => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem sx={{ borderColor: '#888' }} />}
      spacing={4}
      sx={{ color: '#fff', mt: 3 }}
    >
      <FormControl>
        <FormLabel sx={{ color: '#ccc' }}>Тип графика:</FormLabel>
        <RadioGroup value={isBar ? "bar" : "line"} onChange={handleChartType}>
          <FormControlLabel value="bar" control={<Radio sx={{ color: '#fff' }} />} label="Гистограмма" />
          <FormControlLabel value="line" control={<Radio sx={{ color: '#fff' }} />} label="Линейная" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel sx={{ color: '#ccc' }}>Показать:</FormLabel>
        {Object.entries(series).map(([key, value]) => (
          <FormControlLabel
            key={key}
            control={<Checkbox checked={value} onChange={handleToggle} name={key} sx={{ color: '#fff' }} />}
            label={key}
          />
        ))}
      </FormControl>
    </Stack>
  );
}

export default SettingChart;
