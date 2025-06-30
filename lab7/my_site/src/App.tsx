import React from 'react';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Main from './components/Main'
import Footer from './components/Footer'
import './styles/App.css';

function App() {
  return (
    <>
      <SearchBar/>
      <Navbar active='1'/>
      <Gallery/>
      <Main/>
      <Footer/>
    </>
  );
}

export default App;
