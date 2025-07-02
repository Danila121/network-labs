import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import React from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import structures from '../data';
import str from "../data"

function Building() {
  
  const { id } = useParams();
  const building = structures[Number(id ?? '0')];
  return (
    <>
      <Navbar active="0" />
      <Box sx={{ mt: 2, ml: 3, textAlign:"auto"}}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Главная
        </Link>
        <Typography component="span" sx={{ ml: 1,mr:1 }}>
          &lt;&lt;
        </Typography>
        <Typography component="span" color="text.primary">
          {building.title}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: '3vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography color="text.secondary" variant="h4">
          {str[Number(id ?? '0')].title}
        </Typography>
        <Box component="img" src={str[Number(id ?? '0')].img} sx={{ width: '30%', mt: '3vh' }} />
      </Box>

      <Container
        sx={{
          mt: '3vh',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
      >
        {str[Number(id ?? '0')].description.map((item: string, index: number, arr: string[]) => (
          <Box key={index} sx={{ width: `${100 / arr.length}%` }}>
            <Typography>{item}</Typography>
          </Box>
        ))}
      </Container>

    </>
  );
  }
export default Building