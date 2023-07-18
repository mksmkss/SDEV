/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer, ListItem, List, ListItemButton, Divider, TextField, Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
// import SettingsIcon from '@mui/icons-material/Settings';
import Color from '../config/Color';

const styles = {
  text: {
    color: Color.white1,
  },
  text_container: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    color: Color.white1,
  },
};

const menuContents = {
  home: {
    name: 'Home',
    path: '/',
    icon: <HomeIcon style={styles.icon} />,
  },
  search: {
    name: 'Search',
    path: '/search',
    icon: <SearchIcon style={styles.icon} />,
  },
  // settings: {
  //   name: 'Settings',
  //   path: '/settings',
  //   icon: <SettingsIcon style={styles.icon} />,
  // },
};

function DrawerComponent(props) {
  const { drawer, setDrawer } = props;
  const navigate = useNavigate();
  return (
    <Drawer
      anchor="left"
      open={drawer}
      onClose={() => setDrawer(false)}
      PaperProps={{
        sx: {
          width: '20%',
          background: Color.replyblue1,
        },
      }}
    >
      <div className="drawer" style={{ justifyContent: 'center' }}>
        <div style={styles.text_container}>
          <List
            sx={{
              width: '100%',
              marginLeft: '10px',
            }}
          >
            {Object.keys(menuContents).map((key) => (
              // eslint-disable-next-line react/jsx-key
              <div>
                <ListItem key={key}>
                  {menuContents[key].icon}
                  <ListItemButton
                    sx={{
                      height: '50px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                    onClick={() => {
                      navigate(menuContents[key].path);
                      setDrawer(false);
                    }}
                  >
                    <h2 style={styles.text}>{menuContents[key].name}</h2>
                  </ListItemButton>
                  {menuContents[key].name === 'Search' && (
                    <div style={{ flex: 1 }}>
                      <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        size="small"
                        sx={{
                          width: '100%',
                          height: '100%',
                          marginLeft: '10px',
                          flex: 1,
                        }}
                      />
                      <Button variant="contained">Search</Button>
                    </div>
                  )}
                </ListItem>
                {key !== 'settings' && <Divider />}
              </div>
            ))}
          </List>

        </div>
      </div>
    </Drawer>
  );
}
export default DrawerComponent;
