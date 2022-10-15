import React from 'react'
import { Box, Stack, Typography} from '@mui/material';

const Footer = () => {
  return (
    <Box mt='80px'>
      <Stack 
        gap='40px'
        alignItems='center'
        px='40px'
        pt='5px'
      >
        <Typography
          variant='h5'
          color='textPrimary'
          align='center'
          mt='10px'
          mb='25px'
        >
          Made with ❤️ by: <a class='text-decoration-none' href='https://github.com/CarlosD95' target='_blank'>https://github.com/CarlosD95</a>
        </Typography>
      </Stack>
    </Box>
  )
}

export default Footer