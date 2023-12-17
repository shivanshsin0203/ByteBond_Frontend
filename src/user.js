import React,{useEffect,useState} from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

const LeftBox = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100vh',
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    borderRight: 'none',
  },
}));

const RightBox = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100vh',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const UserComponent = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [college, setCollege] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState("Light Mode");
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setMode(darkMode ? "Dark Mode" : "Light Mode")
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#111' : '#fff',
        paper: darkMode ? '#111' : '#fff',
      },
      text: {
        primary: darkMode ? '#fff' : '#000',
      },
    },
  });
    const DrawerContent = () => {
        // Add your drawer content here
        return (
          <div>
            <Stack spacing={2} sx={{ p: 2 }}>
                        <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
                />
                <h3>{name}</h3>
                <Divider />
                <Stack direction="row" spacing={2.5} sx={{ p: 2,cursor: 'pointer' }}>
                 <SettingsIcon></SettingsIcon><h3>Update Profile</h3>
                 </Stack>
                 <Stack direction="row" spacing={2}   sx={{
                      p: 2,
                      position: 'relative',
                      '& h3': {
                        cursor: 'pointer',
                        color: 'initial', // Initial color of the text
                        transition: 'color 0.3s', // Add transition effect
                      },
                      '&:hover h3': {
                        color: 'blue', // Change color on hover
                      },
                      '&:hover::after': {
                        content: '"Coming Soon"',
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'blue',
                        color: '#fff',
                        padding: '4px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        zIndex: '1',
                        opacity: '1',
                        transition: 'opacity 0.3s', // Add transition effect
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'blue',
                        color: '#fff',
                        padding: '4px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        zIndex: '1',
                        opacity: '0',
                      },
                    }}
                  >
                 <GroupAddIcon></GroupAddIcon><h3>Join a Team</h3>
                 </Stack>
                 <Stack direction="row" spacing={1} sx={{ p: 2 }}>
                 <h3>{mode}</h3>
                 <Switch
                  color="default"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  icon={<Brightness7Icon />}
                  checkedIcon={<Brightness4Icon />}
                      />
                  
                      </Stack>
                </Stack>

          </div>
        );
      };
     
      
    const handleDrawerOpen = () => {
      setDrawerOpen(true);
    };
  
    const handleDrawerClose = () => {
      setDrawerOpen(false);
    };
    useEffect(() => {
        const apiurl = `http://localhost:3005/api/v1/getuser/${id}`;
        async function getdata(){
        const result = await axios.get(apiurl);
        console.log(result.data);
        setName(result.data.data.name);
        setEmail(result.data.data.email);
        setSkills(result.data.data.skills);
        setCollege(result.data.data.college);
        }
        getdata();
      }, [id]);
      
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
    <Grid container>
      <LeftBox item xs={12} md={6}>
        {/* Row Stack */}
        <Stack direction="row" spacing={2}>
          {/* Drawer Icon */}
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>

          
     
            <Autocomplete
                options={['Option 1', 'Option 2', 'Option 3']}
                sx={{ width: '100%',borderRadius: '8px'}}
                renderInput={(params) => (
                  
                <TextField
                    {...params}
                    label="Search"
                    variant="outlined"
                    
                    style={{ width: '100%', borderRadius: '8px', backgroundColor: darkMode?'black':'#f0f0f0'}}
                />
               
                )}
            />
          </Stack>

        {/* Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <DrawerContent />
        </Drawer>

        {/* Content for the left box */}
      </LeftBox>

      
      <RightBox item xs={12} md={6}>
      
      </RightBox>
    </Grid>
    </Box>
    </ThemeProvider>
  );
};

export default UserComponent;
