import {Box, Button, TextField} from '@mui/material';

const SearchBar = () => {
  return (
    <Box 
      component="form"
      display="flex"
      justifyContent="center"
      bgcolor="gray"
      p={2}
    >
      <TextField
        variant="outlined"
        placeholder="Поиск"
        sx={{width:"50%",bgcolor:'white'}}
      >  
      </TextField>
      <Button variant="contained" sx={{ml:1, bgcolor:"white"}}>
        🔍   
      </Button>
    </Box>
  )
}
export default SearchBar;