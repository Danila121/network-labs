import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import car1 from '../../images/car1.jpg';
import car2 from '../../images/car2.jpg';
import car3 from '../../images/car3.jpg';

const images = [car1, car2, car3];

const Gallery = () => (
  <Box
    display="flex"
    justifyContent="space-around"
    p="5px"
    bgcolor="gray"
    sx={{ flexDirection: { xs: 'column', md: 'row' } }}
  >
    {images.map((img, i) => (
      <Box
        key={i}
        component={Link}
        to={`/Car/${i + 7}`}
        sx={{
          width: { xs: '100%', md: '30%' },
          display: 'block',
          borderRadius: 1,
        }}
      >
        <Box
          component="img"
          src={img}
          alt={`car-${i + 1}`}
          sx={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      </Box>
    ))}
  </Box>
);

export default Gallery;
