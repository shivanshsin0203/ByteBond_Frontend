import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Container from '@mui/material/Container';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './home.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const FeatureCard = ({ title, description, image }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="div"
      sx={{
        // 16:9
        pt: '56.25%',
      }}
      image={image}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </CardContent>
  </Card>
);
const SocialIcon = ({ icon, href, platform }) => (
  <IconButton className={`social-icon ${platform}`} href={href} target="_blank" rel="noopener noreferrer">
    {icon}
  </IconButton>
);


export default function ByteBondHome() {
  const [darkMode, setDarkMode] = React.useState(false);
  const { id } = useParams();
  console.log(id);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: darkMode ? '#111' : '#fff',
          color: darkMode ? '#fff' : '#000',
          minHeight: '100vh',
          transition: 'background-color 0.3s, color 0.3s',
        }}
      >
      <AppBar position="relative">
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            ByteBond
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Switch
            color="default"
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<Brightness7Icon />}
            checkedIcon={<Brightness4Icon />}
          />
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Connect with ByteBond
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Discover and collaborate with developers matching your skills or college background.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
              <Button variant="outlined" color="primary">
                Log In
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard
                title="Chat Features"
                description="Enjoy real-time communication with other developers using our chat features."
                image="https://source.unsplash.com/random?chat"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard
                title="Connect with Peers"
                description="Meet developers from your domain and college, fostering meaningful connections."
                image="https://source.unsplash.com/random?networking"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard
                title="User Experience"
                description="Create and customize your profile for an enhanced user experience on ByteBond."
                image="https://source.unsplash.com/random?user-experience"
              />
            </Grid>
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Made by Shivansh Singh
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
        <SocialIcon href="#" icon={<InstagramIcon fontSize="large" />} platform="instagram" />
       <SocialIcon href="#" icon={<GitHubIcon fontSize="large" />} platform="github" />
       <SocialIcon href="#" icon={<LinkedInIcon fontSize="large" />} platform="linkedin" />

        </Stack>
      </Box>
      </Box>
    </ThemeProvider>
  );
}
