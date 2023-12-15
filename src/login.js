import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import Toolbar from '@mui/material/Toolbar';
import {  useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function SignIn() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
    const navigate = useNavigate();
  const { mode } = useParams();

  React.useEffect(() => {
    setDarkMode(mode === 'true');
  }, [mode]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const check = { email: data.get('email'), password: data.get('password') };
    const apiurl = "http://localhost:3005/api/v1/login";

    try {
      const result = await axios.post(apiurl, check);
      console.log(result.data.data);

      if(result.data.data!=null){
      setOpenSuccess(true);
      const userId = result.data.data;
      setTimeout(() => {navigate(`/${userId}}`)}, 2000);
      }
      else{setOpenError(true);}

    } catch (error) {
      console.error('Error:', error);
 }
  };

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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Snackbar
            open={openSuccess}
            autoHideDuration={100}
            onClose={handleClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Login Successful!
            </MuiAlert>
          </Snackbar>

          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              Login Failed. Please check your credentials.
            </MuiAlert>
          </Snackbar>

          

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} style={{ marginTop: 40 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LogIn
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={`/signin/${!darkMode}`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
