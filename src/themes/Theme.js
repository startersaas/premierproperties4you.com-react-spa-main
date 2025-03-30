// themes/Theme.js
import { createTheme } from '@mui/material';

const getTheme = (darkMode, isXs = false) => {
  return createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00a400', // Set primary main color to green
      },
    },
    typography: {
      allVariants: {
        fontFamily: 'Poppins',
      },
    },
  });
};

export default getTheme;