import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MessageIcon from '@mui/icons-material/Message';

function Chat() {
  const queryParams = new URLSearchParams(window.location.search);
  const user1 = queryParams.get('userone');
  const user2 = queryParams.get('usertwo');
  const roomId = queryParams.get('id');
  const [socket, setSocket] = useState(null);
  const [prevMessages, setPrevMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user1data, setUser1data] = useState([]);
  const [user2data, setUser2data] = useState([]);
  const [online, setOnline] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [user2avatar, setUser2avatar] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io('https://socket-6095.onrender.com', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });

    newSocket.on('connect', () => {
      console.log('connected');
    });

    newSocket.emit('join_room', { roomid: roomId });

    newSocket.on('data_receive', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    
    async function getMessages() {
      const url = `https://bytebond.onrender.com/api/v1/getmessages/${roomId}`;
      const data = await axios.get(url);
      setPrevMessages(data.data.data);

      const url1 = `https://bytebond.onrender.com/api/v1/getuser/${user1}`;
      const data1 = await axios.get(url1);
      const url2 = `https://bytebond.onrender.com/api/v1/getuser/${user2}`;
      const data2 = await axios.get(url2);
      const url3 = `https://bytebond.onrender.com/api/v1/getavatar`;
        const data3 = await axios.get(url3);
        for(let i=0;i<data3.data.length;i++){
          if(data3.data[i].email===data2.data.data.email){
            setUser2avatar(`https://bytebond.onrender.com/${data3.data[i].profileImageUrl}`);
          }
        }
      setUser1data(data1.data.data);
      setUser2data(data2.data.data);
    }

    getMessages();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, user1, user2]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if(socket){
    socket.on('typing_recived', (data) => {
        setTypingUser(data.isTyping && data.sender !== user1 ? data.sender : '');
    });
    socket.on('online', (data) => {
        if(data.size===2){
         setOnline(true);
        }
        if(data.size===1){
         setOnline(false);
        }
    });
    return () => {
      socket.off('typing');
      socket.off('online');
    };
   }
  }, [socket]);

  const handleTyping = (isTyping) => {
    socket.emit('typing', { roomid: roomId, isTyping, sender: user1 });
  };
  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('data_send', {
        roomid: roomId,
        message: inputMessage,
        sender: user1,
      });
      setInputMessage('');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getBackgroundColor = () => (darkMode ? '#333' : '#fff');
  const getTextColor = () => (darkMode ? '#fff' : '#000');

  const upperSmallLineStyles = {
    borderTop: `1px solid ${darkMode ? 'transparent' : getTextColor()}`,
    boxShadow: darkMode ? 'none' : `0px 1px 3px rgba(0, 0, 0, 0.2)`,
    marginBottom: '10px',
    backgroundColor: darkMode ? '#333' : 'transparent',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: getBackgroundColor(), color: getTextColor(), margin: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: getBackgroundColor(), borderBottom: `1px solid ${darkMode ? 'transparent' : getTextColor()}`, margin: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={user2avatar} alt={user2data.name} sx={{ width: 62, height: 62 }} />
          <div style={{ marginLeft: '15px' }}>
            <Typography variant="h6">{user2data.name}</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{ display: 'flex', alignItems: 'center' }}>
            <MessageIcon fontSize="small" style={{ marginRight: '5px', color: online ? 'darkgreen' : 'grey' }} />
              {online ? 'Online' : 'Offline'}
            </Typography>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        {typingUser && <Typography variant="body2" style={{ color: getTextColor(), marginRight: '10px' }}> typing...</Typography>}
            <Link to={`/user/${user1}`}>
            <HomeIcon style={{ marginRight: '20px' }} />
          </Link>
          <Button variant="outlined" onClick={toggleDarkMode} style={{ marginRight: '10px', color: getTextColor() }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </Button>
        </div>
      </div>
      <div style={{ ...upperSmallLineStyles, margin: 0 }}></div>
      <Paper elevation={3} style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: getBackgroundColor(), overflowX: 'hidden', borderBottom: `1px solid ${darkMode ? 'transparent' : getTextColor()}`, margin: 0 }}>
        {prevMessages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: msg.sender === user1 ? 'row-reverse' : 'row',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender === user1 ? '#4CAF50' : '#ddd',
                padding: '15px',
                borderRadius: '10px',
                color: msg.sender === user1 ? '#fff' : '#000',
                maxWidth: '70%',
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: msg.sender === user1 ? 'row-reverse' : 'row',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender === user1 ? '#4CAF50' : '#ddd',
                padding: '15px',
                borderRadius: '10px',
                color: msg.sender === user1 ? '#fff' : '#000',
                maxWidth: '70%',
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </Paper>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', backgroundColor: getBackgroundColor(), borderTop: `1px solid ${darkMode ? 'transparent' : getTextColor()}`, margin: 0 }}>
      
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message..."
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
            handleTyping(e.target.value !== '');
          }}
          style={{ backgroundColor: darkMode ? '#444' : getBackgroundColor(), margin: 0 }}
          InputProps={{ style: { color: getTextColor() } }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={sendMessage}
          style={{ marginLeft: '10px', backgroundColor: '#2196F3', color: '#fff' }}
        >
          Send
        </Button>
        
      </div>
     
    </div>
  );
}

export default Chat;
