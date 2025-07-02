import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt:'10px',
        p:"5px",
        textAlign: 'center',
        bgcolor: 'grey',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Самые высокие здания. Все права защищены.
      </Typography>
    </Box>
  );
};

export default Footer;
