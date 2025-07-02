import * as React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupChart from "./components/GroupChart"; 
import GroupGrid from "./components/GroupGrid";
import { countries, years, types } from "./groupdata";

type tSelect = "Страна" | "Год" | "Тип";

function Chart() {
  const [group, setGroup] = React.useState<tSelect>("Страна");
  const [groupData, setGroupData] = React.useState(countries);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
    if (value === "Страна") setGroupData(countries);
    else if (value === "Год") setGroupData(years);
    else setGroupData(types);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar active="3" />
      <Box sx={{ width: "200px", m: "20px auto 0" }}>
        <FormControl fullWidth>
          <InputLabel>Группировать по</InputLabel>
          <Select
            id="select-group"
            value={group}
            label="Группировать по"
            onChange={handleChange}
          >
            <MenuItem value="Страна">Стране</MenuItem>
            <MenuItem value="Год">Году</MenuItem>
            <MenuItem value="Тип">Типу</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <GroupChart data={groupData} />

      <Box sx={{ flex: 1 }}>
        <GroupGrid data={groupData} />
      </Box>
      <Footer />
    </Box>
  );
}
export default Chart;
