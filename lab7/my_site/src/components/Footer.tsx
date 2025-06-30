import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box display="flex" justifyContent="space-between" p={3} bgcolor="black" color="white">
    <Typography>Автор: Иванов Иван Иванович</Typography>
    <Typography>Сделано: 22.01.2024</Typography>
  </Box>
);
export default Footer;