import React from 'react';
import { 
  Box, 
  Typography,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MLSFormComponent from './MLSFormComponent';

const IndexPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const headerTextStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: isMobile ? '1.5rem' : '2rem',
  };

  const subheaderTextStyle = {
    textAlign: 'center',
    fontSize: isMobile ? '0.9rem' : '1rem',
  };

  const smallTextStyle = {
    fontSize: '0.75rem',
    textAlign: 'center',
  };

  const bulletPointStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box sx={{ width: '100%', bgcolor: '#f8f9fa' }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HomeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            <Typography variant="h4" sx={headerTextStyle}>
              Launch Your Property Listing Referral Today
            </Typography>
            <Typography variant="body1" sx={subheaderTextStyle}>
              Discover How Thousands of Homeowners Are Getting Their Properties Noticed by Qualified Buyers' Agents
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Form Section */}
      <Box sx={{ width: '100%' }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
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
            }}
          >
            <MLSFormComponent 
              useBorder={true}
              useColor="#f5f5f5"
              useSize="small"
              useButtonSize="medium"
              useMiddle={false}
            />
          </Box>
        </Box>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ width: '100%', bgcolor: '#f0f4f8' }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" sx={{...headerTextStyle, fontSize: isMobile ? '1.25rem' : '1.5rem'}}>
              Why Choose Premier Properties For You
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={bulletPointStyle}>
                <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                Expand Your Property's Reach: Get your MLS listing in front of active buyers' agents searching for properties like yours.
              </Typography>
              
              <Typography sx={bulletPointStyle}>
                <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                Enhance Your Visibility: Your property gets featured to qualified agents who work with Zillow, Realtor.com, and hundreds of other sites.
              </Typography>
              
              <Typography sx={bulletPointStyle}>
                <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                Access Professional Connections: Our network connects your listing with motivated buyers' agents seeking properties for their clients.
              </Typography>
              
              <Typography sx={bulletPointStyle}>
                <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                Guarantee Timely Promotion: Your property will be in front of buyers' agents within 30 days of submission.
              </Typography>
              
              <Typography sx={bulletPointStyle}>
                <CheckCircleIcon sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                Benefit From Proven Results: Join thousands of successful homeowners who've connected with qualified buyers through our free referral service.
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{...smallTextStyle, fontWeight: 'bold'}}>
              Supercharge Your Property Visibility Today →
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Disclaimer Section */}
      <Box sx={{ width: '100%', bgcolor: '#f8f9fa' }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{...smallTextStyle, color: '#6c757d', fontSize: '0.65rem'}}>
              This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
            </Typography>
            
            <Typography variant="caption" sx={{...smallTextStyle, color: '#6c757d', fontSize: '0.65rem'}}>
              INCOME DISCLAIMER: Although we make every effort to accurately represent the services and/or products presented on this website, Premier Properties For You makes no assurance, representation or promise regarding future earnings or income, or that you will make any specific amount of money, or any money at all, or that you will not lose money.
            </Typography>
            
            <Typography variant="caption" sx={{...smallTextStyle, color: '#6c757d', fontSize: '0.65rem'}}>
              © 2025 Premier Properties For You. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default IndexPage;