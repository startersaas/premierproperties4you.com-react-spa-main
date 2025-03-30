import React from 'react';
import { Box } from '@mui/material';

const Footer = ({ 
  display = true, 
  paddingY = 2, 
  paddingX = 0, 
  backgroundColor = '#f8f9fa' 
}) => {
  return (
    <Box
      sx={{
        display: display ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        py: paddingY,
        backgroundColor: backgroundColor,
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
          px: paddingX,
        }}
      >
        <Box component="div">
          {/* Empty div as requested */}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;