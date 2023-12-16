import * as React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Details', 'Skills'];

const defaultTheme = createTheme();

export default function SignUp() {
  const [darkMode, setDarkMode] = React.useState(false);
  const { mode } = useParams();
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [college, setCollege] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [skills, setSkills] = React.useState('');
  const [error, setError] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedDevelopment, setSelectedDevelopment] = React.useState([]);
  const [selectedLanguages, setSelectedLanguages] = React.useState([]);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleDevelopmentChange = (value) => {
    const index = selectedDevelopment.indexOf(value);
    if (index === -1) {
      setSelectedDevelopment([...selectedDevelopment, value]);
    } else {
      setSelectedDevelopment(selectedDevelopment.filter((item) => item !== value));
    }
  };

  const handleLanguagesChange = (value) => {
    const index = selectedLanguages.indexOf(value);
    if (index === -1) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages.filter((item) => item !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeStep === 0 && (!name || !college || !email || !password)) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');

    if (activeStep === steps.length - 1) {
      const data = {
        name,
        college,
        email,
        password,
        skills: selectedDevelopment.concat(selectedLanguages, skills.split(',')),
      };

      const apiurl = "http://localhost:3005/api/v1/signin";
      async function signup() {
        try {
          const result = await axios.post(apiurl, data);
          console.log(result.data.id);

          const direct = { email, password };
          const apiurl2 = "http://localhost:3005/api/v1/login";
          setOpenSuccess(true);
          const result2 = await axios.post(apiurl2, direct);
          console.log(result2.data.data);
          const userId = result2.data.data;
          setTimeout(() => {
            navigate(`/user/${userId}`);
          }, 2000);
        } catch (error) {
          console.error('Error:', error);
          setOpenError(true);
        }
      }
      signup();
    } else {
      handleNext();
    }
  };

  return (
    <ThemeProvider theme={darkMode ? createTheme({ palette: { mode: 'dark' } }) : defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Snackbar
            open={openSuccess}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Account Successfully Created!
            </MuiAlert>
          </Snackbar>

          <Snackbar
            open={openError}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              User already exists
            </MuiAlert>
          </Snackbar>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="college"
                    label="College Name"
                    name="college"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Development</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <ColumnCheckboxes
                      items={[
                        'Web Development', 'Machine Learning', 'App Development',
                        'Artificial Intelligence', 'DevOps'
                        // Add other development items
                      ]}
                      selectedItems={selectedDevelopment}
                      onChange={handleDevelopmentChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Languages and Framework</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <ColumnCheckboxes
                      items={[
                        'JavaScript', 'Java', 'C++', 'Python', 'Ruby', 'ReactJS',
                        'Django', 'NodeJS', 'Java Springboot', 'C#', 'Sql', 'Kotlin', 'Dart'
                        // Add other language items
                      ]}
                      selectedItems={selectedLanguages}
                      onChange={handleLanguagesChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={`/login/${darkMode}`} variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const ColumnCheckboxes = ({ items, selectedItems, onChange }) => {
  const columns = 3; // Number of columns
  const itemsPerColumn = Math.ceil(items.length / columns);

  return (
    <>
      {[...Array(columns)].map((_, columnIndex) => (
        <Box key={columnIndex} sx={{ flex: '1 0 30%' }}>
          {items.slice(columnIndex * itemsPerColumn, (columnIndex + 1) * itemsPerColumn).map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={selectedItems.includes(item)}
                  onChange={() => onChange(item)}
                />
              }
              label={item}
            />
          ))}
        </Box>
      ))}
    </>
  );
};
