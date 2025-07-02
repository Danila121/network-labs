import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { cars } from '../main/data';

export default function Car() {
  const { id } = useParams();
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <Box sx={{ bgcolor: 'gray', minHeight: '100vh', py: 5 }}>
        <Typography variant="h4" align="center" color="white">
          Машина не найдена
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'gray', minHeight: '100vh', color: 'white', pb: 5 }}>
      <Box sx={{ mt: 2, ml: 3 }}>
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          color="inherit"
        >
          Главная
        </Link>
        <Typography component="span" sx={{ mx: 1 }}>
          &lt;&lt;
        </Typography>
        <Typography component="span" color="white">
          {car.name}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4">{car.name}</Typography>
        <Box
          component="img"
          src={car.img}
          alt={car.name}
          sx={{
            width: '30%',
            mt: 3,
            borderRadius: 1,
            border: '4px solid white',
          }}
        />
      </Box>


      <Container
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Typography>{car.description}</Typography>
      </Container>
    </Box>
  );
}
