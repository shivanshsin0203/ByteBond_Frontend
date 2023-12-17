import React,{useEffect,useState} from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

const LeftBox = styled(Grid)(({ theme }) => ({
  backgroundColor: '#ffffff',
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

const DrawerContent = () => {
    // Add your drawer content here
    return (
      <div>
        {/* Drawer content */}
      </div>
    );
  };
  
const UserComponent = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState([]);
    const [college, setCollege] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

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
                    
                    style={{ width: '100%', borderRadius: '8px', backgroundColor: '#f0f0f0' }}
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
  );
};

export default UserComponent;
