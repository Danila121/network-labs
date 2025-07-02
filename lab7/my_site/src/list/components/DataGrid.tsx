import React from 'react';
import carsData from "../data";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function CarsGrid() {
  const rows: GridRowsProp = carsData.map((item, index) => ({
    id: index,
    ...item,
  }));

  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1 },
    { field: 'Производитель', flex: 0.7 },
    { field: 'Цена', headerName: 'Цена ($)', flex: 0.5, type: 'number' },
    { field: 'Год', headerName: 'Год выпуска', flex: 0.5, type: 'number' },
    { field: 'Мощность', headerName: 'Мощность (л.с.)', flex: 0.6, type: 'number' },
    { field: 'Макс. скорость', headerName: 'Макс. скорость (км/ч)', flex: 0.7, type: 'number' },
    { field: 'Разгон 0-100', headerName: 'Разгон 0-100 (с)', flex: 0.7, type: 'number' },
  ];

  return (
    <Box sx={{ bgcolor: 'gray', py: 4 }}>
      <Container maxWidth="lg" sx={{ height: '700px' }}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          showToolbar={true}
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            padding: 2,
          }}
        />
      </Container>
    </Box>
  );
}

export default CarsGrid;
