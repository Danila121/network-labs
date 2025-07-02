import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

interface ComponentProps {
  active: string;
}

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <AppBar position="static" sx={{ bgcolor: '#1e1e1e', p: 1 }}>
      <Toolbar sx={{ justifyContent: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
          Едь в будущее с Германскими автомобилями!
        </Typography>
      </Toolbar>

      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Link to="/">
            <Button color="inherit" variant={active === '1' ? 'outlined' : 'text'}>
              Главная страница
            </Button>
          </Link>
          <Link to="/list">
            <Button color="inherit" variant={active === '2' ? 'outlined' : 'text'}>
              Таблица 
            </Button>
          </Link>
          <Link to="/chart">
            <Button color="inherit" variant={active === '3' ? 'outlined' : 'text'}>
              График
            </Button>
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            p: 2,
            bgcolor: '#1e1e1e',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Link to="/">
            <Button color="inherit" variant={active === '1' ? 'outlined' : 'text'} sx={{ color: 'white' }} onClick={toggleDrawer(false)}>
              Главная страница
            </Button>
          </Link>
          <Link to="/list">
            <Button color="inherit" variant={active === '2' ? 'outlined' : 'text'} sx={{ color: 'white' }} onClick={toggleDrawer(false)}>
              Таблица
            </Button>
          </Link>
          <Link to="/chart">
            <Button color="inherit" variant={active === '3' ? 'outlined' : 'text'} sx={{ color: 'white' }} onClick={toggleDrawer(false)}>
              График
            </Button>
          </Link>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
