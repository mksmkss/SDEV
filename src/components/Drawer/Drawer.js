/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer, ListItem, List, ListItemButton, Divider, TextField, IconButton, InputAdornment,
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
  searchField: {
    transition: 'width 0.3s ease-in-out', // アニメーションの定義
    '& .MuiInputBase-input': {
      color: Color.white1, // 入力文字の色
    },
    '& label': {
      color: Color.white1, // 通常時のラベル色
    },
    '& label.Mui-focused': {
      color: Color.white1, // フォーカス時のラベル色
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#CCCCCC', // 通常時のボーダー色
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: Color.white1, // ホバー時のボーダー色
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#CCCCCC', // 通常時のボーダー色(アウトライン)
      },
      '&:hover fieldset': {
        borderColor: Color.white1, // ホバー時のボーダー色(アウトライン)
      },
    },
  },
};

function DrawerComponent(props) {
  const { drawer, setDrawer } = props;
  const [isSearch, setSearch] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const navigate = useNavigate();
  const menuContents = {
    home: {
      name: 'Home',
      icon: <HomeIcon style={styles.icon} />,
      onClick: () => {
        navigate('/');
        setDrawer(false);
      },
    },
    search: {
      name: 'Search',
      icon: <SearchIcon style={styles.icon} />,
      onClick: () => {
        setSearch(!isSearch);
      },
    },
    // settings: {
    //   name: 'Settings',
    //   path: '/settings',
    //   icon: <SettingsIcon style={styles.icon} />,
    // },
  };
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
              marginRight: '10px',
            }}
          >
            {Object.keys(menuContents).map((key) => (
              // eslint-disable-next-line react/jsx-key
              <div>
                <ListItem
                  key={key}
                >
                  {menuContents[key].icon}
                  <ListItemButton
                    sx={{
                      height: '50px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                    onClick={menuContents[key].onClick}
                  >
                    <h2 style={styles.text}>{menuContents[key].name}</h2>
                  </ListItemButton>
                </ListItem>
                {menuContents[key].name === 'Home' && <Divider />}
              </div>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            >
              <TextField
                label="検索"
                variant="outlined"
                color="primary"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                sx={{
                  ...styles.searchField,
                  width: isSearch ? '100%' : '0px',
                  overflow: isSearch ? 'visible' : 'hidden',
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={
                          () => {
                            navigate(`/search/${searchWord}`);
                            setSearch(false);
                          }
                        }
                        disabled={searchWord === ''}
                      >
                        <SearchIcon sx={{ color: Color.white1 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchWord !== '') {
                    // Enter or Space で実行
                    navigate(`/search/${searchWord}`);
                    setSearch(false);
                  }
                }}
              />
            </div>
          </List>
        </div>
      </div>
    </Drawer>
  );
}
export default DrawerComponent;
