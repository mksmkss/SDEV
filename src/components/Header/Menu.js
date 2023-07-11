/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // eslint-disable-line import/no-extraneous-dependencies
import { IconButton } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { isLogin } from '../config/user';

const styles = {
  button_continer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    fontSize: '30px',
  },
};

function LogoutedItems({ pressedLogin, pressedSignup }) {
  return (
    <div>
      <MenuItem onClick={pressedLogin}>
        <ListItemIcon>
          <LoginIcon fontSize="small" />
        </ListItemIcon>
        Login
      </MenuItem>
      <MenuItem onClick={pressedSignup}>
        <ListItemIcon>
          <PersonAddIcon fontSize="small" />
        </ListItemIcon>
        Signup
      </MenuItem>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function LoginedItems({ pressedProfile, pressedSettings, pressedLogout }) {
  return (
    <div>
      <MenuItem onClick={pressedProfile}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        Profile
      </MenuItem>
      <Divider />
      {/* <MenuItem onClick={pressedSettings}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem> */}
      <MenuItem onClick={pressedLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </div>
  );
}

function MenuComponent() {
  const isLoginValue = useContext(isLogin);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pressedProfile = () => {
    navigate('/profile');
  };

  const pressedSettings = () => {
    navigate('/settings');
  };

  const pressedCart = () => {
    navigate('/cart');
  };

  const pressedLogout = () => {
    // eslint-disable-next-line react/destructuring-assignment
    isLoginValue.setLogin(false);
    sessionStorage.setItem('isLogin', false);
    navigate('/');
  };
  const pressedLogin = () => {
    navigate('/login');
  };

  const pressedSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="right" style={styles.right_container}>
      <IconButton onClick={pressedCart}>
        <ShoppingCartIcon style={styles.button} />
      </IconButton>
      <IconButton
        onClick={handleClick}
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AccountCircleIcon style={styles.button} />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
        // eslint-disable-next-line react/destructuring-assignment
        isLoginValue.login ? (
          <LoginedItems
            pressedProfile={pressedProfile}
            pressedSettings={pressedSettings}
            pressedLogout={pressedLogout}
          />
        )
          : (
            <LogoutedItems
              pressedLogin={pressedLogin}
              pressedSignup={pressedSignup}
            />
          )
}
      </Menu>
    </div>
  );
}

export default MenuComponent;
