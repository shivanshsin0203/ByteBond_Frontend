import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
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

const UserComponent = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState([]);
    const [college, setCollege] = useState("");
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
       
      </LeftBox>

      
      <RightBox item xs={12} md={6}>
      
      </RightBox>
    </Grid>
  );
};

export default UserComponent;
