import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarsGrid from './components/DataGrid'; 

export default function CarsList() {
  return (
    <>
      <Navbar active="2" />
      <CarsGrid />
      <Footer />
    </>
  );
}
