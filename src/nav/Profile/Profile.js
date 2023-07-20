/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import {
  Alert, Card, Snackbar, TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import server from '../../backend/server_url.json';
import Color from '../../components/config/Color';

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textfield: {
    width: '80%',
    maxWidth: '400px',
    margin: '10px',
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: Color.replyblue2,
    color: 'white',
    fontSize: '20px',
    borderRadius: '10px',
    width: '75%',
    height: '50px',
    marginTop: '20px',
  },
  disabledButton: {
    backgroundColor: Color.replyblue2,
    color: 'white',
    fontSize: '20px',
    borderRadius: '10px',
    width: '75%',
    height: '50px',
    marginTop: '20px',
    opacity: 0.5,
  },
};

function Profile() {
  const [drawer, setDrawer] = useState(false);
  const { url } = server;
  const { userId } = JSON.parse(sessionStorage.getItem('user'));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://${url}:8000/api/getUser/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setName(data.user[0][1]);
          setEmail(data.user[0][2]);
        } else {
          console.error('Failed to fetch user:', data.status);
        }
      } catch (error) {
        console.error('Error while fetching user:', error);
      }
    };
    fetchUser();
  }, []);
  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };
  const handleWarningClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenWarning(false);
  };

  return (
    <div style={styles.container}>
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <Card sx={{
        marginTop: '40px',
        borderRadius: '10px',
        paddingTop: '30px',
        paddingBottom: '30px',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
      }}
      >
        <h2>ユーザー名</h2>
        <TextField
          id="outlined-basic"
          label="ユーザー名"
          variant="outlined"
          sx={styles.textfield}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setIsChanged(true);
          }}
        />
        <h2>メールアドレス</h2>
        <TextField
          id="outlined-basic"
          label="メールアドレス"
          variant="outlined"
          sx={styles.textfield}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsChanged(true);
          }}
        />
        <ButtonContainer
          name={name}
          email={email}
          setOpenSuccess={setOpenSuccess}
          setOpenWarning={setOpenWarning}
          navigate={navigate}
          isChanged={isChanged}
          userId={userId}
        />
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          更新完了
        </Alert>
      </Snackbar>
      <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleWarningClose}>
        <Alert onClose={handleWarningClose} severity="warning" sx={{ width: '100%' }}>
          更新に失敗しました
        </Alert>
      </Snackbar>
    </div>
  );
}

function ButtonContainer({
  // eslint-disable-next-line react/prop-types, no-unused-vars
  name, email, setOpenSuccess, setOpenWarning, navigate, isChanged, userId,
}) {
  const editUser = async () => {
    const { url } = server;
    const data = { name, email, userId };
    const response = await fetch(`http://${url}:8000/api/editUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth: data }),
    });
    const result = await response.json();
    // eslint-disable-next-line no-promise-executor-return
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    console.log(result);
    if (result.status === 'success') {
      sessionStorage.setItem('user', JSON.stringify({ name, userId }));
      setOpenSuccess(true);
      await delay(600);
      navigate(-1);
    } else {
      setOpenWarning(true);
    }
  };

  return (
    <div className="buttonContainer" style={styles.buttonContainer}>
      {email === '' || name === '' || !isChanged
        ? (
          <button type="button" disabled style={styles.disabledButton}>Done</button>
        )
        : (
          <button type="button" onClick={editUser} style={styles.button}>Done</button>
        )}
    </div>
  );
}

export default Profile;
