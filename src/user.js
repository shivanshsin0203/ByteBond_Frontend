import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

const LeftBox = styled(Grid)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  height: '100vh',
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    borderRight: 'none',
  },
}));

const RightBox = styled(Grid)(({ theme }) => ({
  backgroundColor: '#ffffff',
  height: '100vh',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MyComponent = () => {
  return (
    <Grid container>
     <LeftBox item xs={12} md={6}>
       
      </LeftBox>

      
      <RightBox item xs={12} md={6}>
      
      </RightBox>
    </Grid>
  );
};

export default MyComponent;
