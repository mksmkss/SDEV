/* eslint-disable react/button-has-type */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import {
  FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Card,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { isLogin } from '../../database/user';
import Header from '../../components/Header/Header';
import Color from '../../components/config/Color';
import server from '../../backend/server_url.json';

const styles = {
  signup: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  signupContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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

function Signup() {
  const isLoginValue = useContext(isLogin);
  const [drawer, setDrawer] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
  // isLoginValueをsessionStorageに保存
    // eslint-disable-next-line react/destructuring-assignment
    sessionStorage.setItem('isLogin', isLoginValue.login);
  }, [isLoginValue]);

  return (
    <div className="signup" style={styles.signup}>
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
        title="Signup"
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
        <SignupContainer
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <ButtonContainer
          name={name}
          email={email}
          password={password}
          isLoginValue={isLoginValue}
          navigate={useNavigate()}
        />
      </Card>
    </div>
  );
}

function SignupContainer(
  {
    // eslint-disable-next-line react/prop-types
    name, setName, email, setEmail, password, setPassword, showPassword, setShowPassword,
  },
) {
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="signupContainer" style={styles.signupContainer}>
      <h1>Welcome!</h1>
      <FormControl sx={{ m: 1, width: '75%' }} variant="outlined">
        <InputLabel htmlFor="outlined-basic">Name</InputLabel>
        <OutlinedInput
          id="outlined-basic"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '75%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '75%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
      )}
          label="Password"
        />
      </FormControl>
    </div>
  );
}

function ButtonContainer({
  // eslint-disable-next-line react/prop-types, no-unused-vars
  name, email, password, isLoginValue, navigate,
}) {
  const signup = async () => {
    const { url } = server;
    const data = { name, email, password };
    const response = await fetch(`http://${url}:8000/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth: data }),
    });
    const result = await response.json();
    // eslint-disable-next-line no-promise-executor-return
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (result.status === 'success') {
      sessionStorage.setItem('isLogin', true);
      // eslint-disable-next-line react/prop-types, react/destructuring-assignment
      isLoginValue.setLogin(true);
      await delay(300);
      navigate(-1);
      alert(`${name}さん、ようこそ！`);
    } else {
      alert('すでに登録されているメールアドレスです');
    }
  };

  return (
    <div className="buttonContainer" style={styles.buttonContainer}>
      {/* <button type="button" onClick={signup} disabled={email === '' || password === ''} style={styles.button}>Log in</button> */}
      {email === '' || password === ''
        ? (
          <button type="button" disabled style={styles.disabledButton}>Sign up</button>
        )
        : (
          <button type="button" onClick={signup} style={styles.button}>Sign up</button>
        )}

    </div>
  );
}

export default Signup;
