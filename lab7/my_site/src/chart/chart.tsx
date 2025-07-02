import * as React from 'react';
import { Box } from '@mui/material';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarsChart from "./components/CarsChart";
import carsData from "../list/data";

export default function Chart() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'gray' }}>
      <Navbar active="3" />
      <CarsChart data={carsData} />
      <Footer />
    </Box>
  );
}
