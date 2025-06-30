import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'justify',
    color: (`text.secondary`),
    border: 'none',
    marginBottom: "0.6em" 
}));

interface ComponentProps {
    building: {
        img: string, 
        title: string, 
        description: string[],
    };
    index: number;
  }

function BuildCard({ building, index} : ComponentProps) {
    return (
      <Card sx={{  display: 'flex' }}>
        <CardMedia
            sx={{ order: index % 2 === 0 ? 2 : 1 }}
            component="img"
            alt={ building.title }
            image={ building.img }
        />
        <Box sx={{ order: index % 2 === 0 ? 1 : 2 }}>
          <CardContent sx={ {order:3 }}>
            <StyledTypography gutterBottom variant="h5" >
              { building.title }
            </StyledTypography>
            { building.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2">    
                { item }
              </StyledTypography>
            ))}
          </CardContent>
          <CardActions sx={{ justifyContent: index % 2 === 0 ? "start" : "end" }} >
            <Button size="small">Подробнее</Button>
          </CardActions>
        </Box>
      </Card>
    )
}

export default BuildCard;