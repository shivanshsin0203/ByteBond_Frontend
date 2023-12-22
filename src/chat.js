// Chat.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

function Chat() {
  const queryParams = new URLSearchParams(window.location.search);
  const user1 = queryParams.get('userone');
  const user2 = queryParams.get('usertwo');
  const roomId = queryParams.get('id');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
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

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, user1, user2]);

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

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
