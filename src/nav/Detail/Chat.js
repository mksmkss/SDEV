import React, { useState } from 'react';
import {
  Container, TextField, Grid, Button, Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const styles = {
  container: {
    // height: '80vh',
    width: '100%',
    marginTop: '50px',
    backgroundColor: 'red',
  },
};
function ChatComponent() {
  const [messages, setMessages] = useState([
    { id: 1, content: 'こんにちは！', sender: 'user' },
    { id: 2, content: 'はじめまして！', sender: 'bot' },
  ]);

  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        content: messageInput,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <Container maxWidth="sm" style={styles.container}>
      <Grid container spacing={0} style={{ height: '100%' }}>
        <Grid item xs={12}>
          <Paper style={{ padding: '10px', height: '70vh', overflow: 'auto' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  textAlign: message.sender === 'user' ? 'right' : 'left',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#E0E0E0',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'inline-block',
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '10px' }}>
          <TextField
            label="メッセージを入力"
            fullWidth
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            style={{ marginTop: '10px' }}
          >
            送信
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatComponent;
