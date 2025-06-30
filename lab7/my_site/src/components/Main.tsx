import React from 'react';
import { Box, Typography } from '@mui/material';
import car1 from '../images/car5.jpg';
import car2 from '../images/car6.jpg';
import car3 from '../images/car7.jpg';
import car4 from '../images/car8.jpg';
import car5 from '../images/car9.jpg';
import car6 from '../images/car4.jpg';

const Main = () => {
  return (
    <main>
      <Box display="flex" bgcolor="gray" color="white" flexDirection="column">
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} m={{ xs: 0, md: "3px" }}>
          <Box
            display="flex"
            flexDirection="column"
            width={{ xs: 'auto', md: '66.66%' }}
            p={4}
          >
            <img src={car1} alt="Volkswagen W12" style={{ width: '100%', height: 300 }} />
            <Typography variant="h5" align="center" mt={2}>Volkswagen W12</Typography>
            <Typography textAlign="justify" mt={1}>
              Это мощный и надежный автомобиль с высокими показателями безопасности и производительности.
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width={{ xs: 'auto', md: '33.33%' }}
            p={4}
          >
            <img src={car2} alt="BMW M850i" style={{ width: '100%', height: 300 }} />
            <Typography variant="h5" align="center" mt={2}>BMW M850i</Typography>
            <Typography textAlign="justify" mt={1}>
              Инновационный дизайн и высокие технологии делают этот автомобиль идеальным выбором для современного водителя.
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} m={{ xs: 0, md: 3 }}>
          <Box
            display="flex"
            flexDirection="column"
            width={{ xs: 'auto', md: '50%' }}
            p={4}
            m={{ xs: 0, md: 1 }}
            sx={{border:{xs:"none", md:"1px solid white"}}}
          >
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              <Box
                component="img"
                src={car3}
                alt="BMW M850i"
                sx={{
                  width: { xs: '100%', md: '50%' },
                  height: 300
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  px: 2,
                  width: { xs: '100%', md: '50%' },
                }}
              >
                BMW M850i
              </Typography>
            </Box>
            <Typography mt={2} textAlign="justify">
              BMW M850i — это высококачественный спортивный автомобиль, который сочетает в себе элегантный дизайн и передовые технологии. С двигателем мощностью более 500 лошадиных сил, он способен разгоняться до 100 км/ч всего за 3,7 секунды. Внутри автомобиля вас ждёт роскошный интерьер с кожаными сиденьями и современной мультимедийной системой. Этот автомобиль идеально сочетает комфорт и производительность, что делает его одним из лучших выборов среди премиум-класса.
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            width={{ xs: 'auto', md: '50%' }}
            p={4}
            m={{ xs: 0, md: 1 }}
            sx={{border:{xs:"none", md:"1px solid white"}}}
          >
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              <Box
                component="img"
                src={car4}
                alt="Audi RS7"
                sx={{
                  width: { xs: '100%', md: '50%' },
                  height: 300,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  px: 2,
                  width: { xs: '100%', md: '50%' }
                }}
              >
                Audi RS7
              </Typography>
            </Box>
            <Typography mt={2} textAlign="justify">
              Audi RS7 — это мощный и стильный спортивный седан, который впечатляет не только своей динамикой, но и премиальной отделкой. С двигателем V8, он может разогнаться до 100 км/ч за 3,6 секунды. Внутри — высококачественные материалы, спортивные сиденья и передовые системы безопасности и комфорта. Audi RS7 сочетает в себе элегантность и исключительную производительность, становясь идеальным выбором для любителей динамичного вождения.
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} m={{ xs: 0, md: 3 }}>
          <Box
            display="flex"
            flexDirection="column"
            width={{ xs: 'auto', md: '50%' }}
            p={4}
            m={{ xs: 0, md: 1 }}
            sx={{border:{xs:"none", md:"1px solid white"}}}
          >
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              <Box
                component="img"
                src={car5}
                alt="Mercedes-Benz S-Class"
                sx={{
                  width: { xs: '100%', md: '50%' },
                  height: 300,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  px: 2,
                  width: { xs: '100%', md: '50%' }
                }}
              >
                Mercedes-Benz S-Class
              </Typography>
            </Box>
            <Typography mt={2} textAlign="justify">
              Mercedes-Benz S-Class — это воплощение роскоши и технологических инноваций. С двигателем мощностью более 400 лошадиных сил, он предлагает безупречное вождение и комфорт на любом пути. Интерьер этого автомобиля выполнен из высококачественных материалов, включая кожу и дерево. Системы помощи водителю и передовые мультимедийные технологии делают S-Class идеальным выбором для тех, кто ценит комфорт и безопасность.
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            width={{ xs: 'auto', md: '50%' }}
            p={4}
            m={{ xs: 0, md: 1 }}
            sx={{border:{xs:"none", md:"1px solid white"}}}
          >
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
              <Box
                component="img"
                src={car6}
                alt="Porsche 911"
                sx={{
                  width: { xs: '100%', md: '50%' },
                  height: 300,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  px: 2,
                  width: { xs: '100%', md: '50%' }
                }}
              >
                Porsche 911
              </Typography>
            </Box>
            <Typography mt={2} textAlign="justify">
              Porsche 911 — это культовый спортивный автомобиль с уникальной историей и современными технологиями. С двигателем мощностью до 450 лошадиных сил, он способен разгоняться до 100 км/ч за 4 секунды. Отличается высокой управляемостью и стабильностью на дороге. Внутри — спортивный и элегантный интерьер с современными системами безопасности и удобствами. Porsche 911 сочетает в себе лучшие традиции автопроизводства и инновационные решения, идеально подходя для любителей драйва и эксклюзива.
            </Typography>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default Main;
