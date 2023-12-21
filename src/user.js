import React,{useEffect,useState} from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography'; // Add Typography import
import Paper from '@mui/material/Paper'; // Add Paper import
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
import { Link,useParams,useNavigate } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
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
  const [totaldata, setTotaldata] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selctedotherUser, setSelctedotherUser] = useState([]);
  const navigate = useNavigate();

  const handlePopClick = (event,item) => {
    setSelctedotherUser(item);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const popid = open ? 'simple-popper' : undefined;
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
  const handleAutocompleteSelect = (option) => {
    if(option){
    console.log(option);
    setSelctedotherUser(option);
    const usedata = [...totaldata]; // Create a shallow copy to avoid modifying the original array

    console.log(usedata);

    const index = usedata.findIndex((item) => item.email === option.email);

    if (index !== -1) {
        const adjusteddata = usedata.splice(index, 1)[0]; // Use splice to remove the element at the found index
        usedata.unshift(adjusteddata);
    }

    console.log(usedata);
    setTotaldata(usedata);
    console.log("Option clicked:", option)}
  };
  
    const DrawerContent = () => {
        // Add your drawer content here
        return (
          <div >
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
                 <Stack direction="row" spacing={2}   sx={{p: 2,cursor: 'pointer' }}>
                 <HomeIcon></HomeIcon><h3>Home</h3>
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
                  icon={<Brightness7Icon color='blue' />}
                  checkedIcon={<Brightness4Icon />}
                      />
                  
                      </Stack>
                </Stack>

          </div>
        );
      };
      const skillList = [
        'Web Development',
        'Machine Learning',
        'App Development',
        'Artificial Intelligence',
        'DevOps',
        'JavaScript',
        'Java',
        'C++',
        'Python',
        'Ruby',
        'ReactJS',
        'Django',
        'NodeJS',
        'Java Springboot',
        'C#',
        'Sql',
        'Kotlin',
        'Dart',
      ];
      
      const skillColors = {
        'Web Development': '#64b5f6',
        'Machine Learning': '#81c784',
        'App Development': '#ffb74d',
        'Artificial Intelligence': '#9575cd',
        'DevOps': '#4dd0e1',
        'JavaScript': '#ff8a65',
        'Java': '#aed581',
        'C++': '#90a4ae',
        'Python': '#ffcc80',
        'Ruby': '#f48fb1',
        'ReactJS': '#81c784',
        'Django': '#64b5f6',
        'NodeJS': '#81d4fa',
        'Java Springboot': '#aed581',
        'C#': '#ff8a65',
        'Sql': '#90a4ae',
        'Kotlin': '#ffcc80',
        'Dart': '#f48fb1',
      };
      
      const skillIcons = {
        'Web Development': '🌐',
        'Machine Learning': '🤖',
        'App Development': '📱',
        'Artificial Intelligence': '🧠',
        'DevOps': '⚙️',
        'JavaScript': '🔧',
        'Java': '☕',
        'C++': '🔍',
        'Python': '🐍',
        'Ruby': '💎',
        'ReactJS': '⚛️',
        'Django': '🎸',
        'NodeJS': '🟢',
        'Java Springboot': '☁️',
        'C#': '🔷',
        'Sql': '🗃️',
        'Kotlin': '🐾',
        'Dart': '🎯',
      };
      
      const RightBoxContent = () => {
        const columns = 3; // Number of columns
        if (!selctedotherUser || !selctedotherUser.skills||selctedotherUser.skills.length === 1) {
          return null; // Return null or handle appropriately
        }
        const filteredSkills = selctedotherUser.skills.filter(skill => skill.trim() !== ''); // Exclude empty skills
      
        return (
          <Stack spacing={3} alignItems="center" sx={{ p: 2 }}>
            {/* Avatar */}
            <Avatar alt={selctedotherUser.name} src={selctedotherUser.avatar} sx={{ width: 80, height: 80 }} />
      
            {/* User Information */}
            <Stack spacing={1} alignItems="center">
              <Typography variant="h5">{selctedotherUser.name}</Typography>
              <Typography variant="body1">{selctedotherUser.email}</Typography>
              <Typography variant="body1">{selctedotherUser.college}</Typography>
            </Stack>
      
            {/* Divider */}
            <Paper variant="outlined" sx={{ width: '100%', height: 1 }} />
      
            {/* Skills Boxes in Columns */}
            <Stack spacing={1} direction="row" justifyContent="center">
              {[...Array(columns)].map((_, columnIndex) => (
                <Stack key={columnIndex} spacing={1} alignItems="center" sx={{ flex: '1 0 30%' }}>
                  {filteredSkills
                    .slice(columnIndex * Math.ceil(filteredSkills.length / columns), (columnIndex + 1) * Math.ceil(filteredSkills.length / columns))
                    .map((skill, index) => (
                      <Paper key={index} elevation={3} sx={{ padding: 2, borderRadius: 8, width: '100%', backgroundColor: skillColors[skill] }}>
                        <Typography variant="h5">{skillIcons[skill]}</Typography>
                        <Typography variant="h10">{skill}</Typography>
                      </Paper>
                    ))}
                   
                </Stack>
              ))}
            </Stack>
            <Button
                      onClick={() => handleStackClick(selctedotherUser)}
                      variant="contained" 
                      sx={{
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        '&:hover': {
                          backgroundColor: '#45a049',
                        },
                      }}
                    >
                      Open Chat
                    </Button>
          </Stack>
        );
      };
    const handleStackClick = (item) => {
         const user1=id.slice(5, 10);
         const user2=item._id.slice(5, 10);
         let roomId;
         if(user1<user2){
           roomId=user1+user2;
         }
         else{
          roomId=user2+user1;
         }
         navigate(`/chat/?id=${roomId}?userone=${id}?usertwo=${item._id}`)
    }
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
        setName(result.data.data.name);
        setEmail(result.data.data.email);
        setSkills(result.data.data.skills);
        setCollege(result.data.data.college);
        const apiurl2 = `http://localhost:3005/api/v1/recommend/${id}`;
        const recived = await axios.get(apiurl2);
        setTotaldata(recived.data.data);
        setSelctedotherUser(recived.data.data[0]);
        
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
        <Stack direction="row" spacing={2} marginTop={"10px"}>
          {/* Drawer Icon */}
          <IconButton onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Autocomplete
          options={totaldata}
          sx={{ width: '100%',borderRadius: '8px'}}
          getOptionLabel={(option) => option.name}
          onChange={(event, selectedOption) => handleAutocompleteSelect(selectedOption)}
          renderInput={(params,option) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              style={{ width: '100%', borderRadius: '8px', backgroundColor: darkMode ? 'black' : '#f0f0f0' }}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Avatar alt={option.name} src={option.avatar} sx={{ width: 32, height: 32, marginRight: 1 }} />
              {option.name}
             
            </Box>
          )}
        />
          </Stack>
          <Stack spacing={0.75} sx={{ p: 2 }}>
              {totaldata.slice(0, 8).map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={0.75}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    borderRadius: '10px',
                    border: '0.3px solid #ddd', // Border color
                    '&:hover': {
                      backgroundColor: darkMode ? '#333' : '#f5f5f5', // Highlight color on hover
                    },
                  }}
                  onClick={(event)=>handlePopClick(event,item)}
                >
                  <Popper id={popid} open={open} anchorEl={anchorEl} placement="bottom-end"
                   style={{ zIndex: 1, position: 'fixed', right: 0, top: '100%' }}>
                   <Button
                      onClick={() => handleStackClick(item)}
                      variant="contained" 
                      sx={{
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        '&:hover': {
                          backgroundColor: '#45a049',
                        },
                      }}
                    >
                      Open Chat
                    </Button>
                    </Popper>
                  <Avatar alt={item.name} src={item.avatar} sx={{ width: 42, height: 42 }} />
                  <h4 sx={{ margin: 'auto 0', marginLeft: '8px' }}>{item.name}</h4>
                  
                </Stack>
              ))}
            </Stack>


        {/* Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <DrawerContent />
        </Drawer>

        {/* Content for the left box */}
      </LeftBox>

      
      <RightBox item xs={12} md={6}>
      <RightBoxContent />
      </RightBox>
    </Grid>
    </Box>
    </ThemeProvider>
  );
};

export default UserComponent;
