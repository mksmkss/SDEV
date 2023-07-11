/* eslint-disable react/button-has-type */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import {
  FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Card, Snackbar, Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { auth, isLogin } from '../../components/config/user';
import Header from '../../components/Header/Header';
import Color from '../../components/config/Color';
import server from '../../backend/server_url.json';

const styles = {
  login: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  loginContainer: {
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

function Login() {
  const isLoginValue = useContext(isLogin);
  const authValue = useContext(auth);
  const [drawer, setDrawer] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [name, setName] = useState('');
  useEffect(() => {
  // isLoginValueをsessionStorageに保存
    // eslint-disable-next-line react/destructuring-assignment
    sessionStorage.setItem('isLogin', isLoginValue.login);
  }, [isLoginValue]);
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
    <div className="login" style={styles.login}>
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
        title="Login"
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
        <LoginContainer
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <ButtonContainer
          email={email}
          password={password}
          isLoginValue={isLoginValue}
          authValue={authValue}
          navigate={useNavigate()}
          setOpenSuccess={setOpenSuccess}
          setOpenWarning={setOpenWarning}
          setName={setName}
        />
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          {name}
          さん、おかえりなさい！
        </Alert>
      </Snackbar>
      <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleWarningClose}>
        <Alert onClose={handleWarningClose} severity="warning" sx={{ width: '100%' }}>
          メールアドレスまたはパスワードが間違っています
        </Alert>
      </Snackbar>
    </div>
  );
}

function LoginContainer(
  {
    // eslint-disable-next-line react/prop-types
    email, setEmail, password, setPassword, showPassword, setShowPassword,
  },
) {
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="loginContainer" style={styles.loginContainer}>
      <h1>Welcome back!</h1>
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
  email, password, isLoginValue, authValue, navigate, setName, setOpenSuccess, setOpenWarning,
}) {
  const login = async () => {
    const { url } = server;
    const data = { email, password };
    const response = await fetch(`http://${url}:8000/api/login`, {
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
      sessionStorage.setItem('isLogin', true);
      // eslint-disable-next-line react/prop-types, react/destructuring-assignment
      isLoginValue.setLogin(true);
      // eslint-disable-next-line react/prop-types, react/destructuring-assignment
      authValue.setUser({ name: result.name, userId: result.userId });
      sessionStorage.setItem('user', JSON.stringify({ name: result.name, userId: result.userId }));
      setName(result.name);
      setOpenSuccess(true);
      await delay(600);
      navigate(-1);
    } else {
      setOpenWarning(true);
    }
  };

  return (
    <div className="buttonContainer" style={styles.buttonContainer}>
      {/* <button type="button" onClick={login} disabled={email === '' || password === ''} style={styles.button}>Log in</button> */}
      {email === '' || password === ''
        ? (
          <button type="button" disabled style={styles.disabledButton}>Log in</button>
        )
        : (
          <button type="button" onClick={login} style={styles.button}>Log in</button>
        )}

    </div>
  );
}

export default Login;
