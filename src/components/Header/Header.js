/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // eslint-disable-line import/no-extraneous-dependencies
import { IconButton } from '@mui/material';
import Color from '../config/Color';
import MenuComponent from './Menu';
import Drawer from '../Drawer/Drawer';

const styles = {
  header_container: {
    display: 'flex',
    // position: 'fixed',
    justifyContent: 'center',
    backgroundColor: Color.replyblue2,
  },
  title_container: {
    flex: 6,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  left_container: {
    flex: 2,
    display: 'flex',
    // backgroundColor: Color.replyblue1,
    justifyContent: 'flex-start',
    paddingLeft: '30px',
    alignItems: 'center',
  },
  right_container: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '30px',
    alignItems: 'center',
    // backgroundColor: Color.replyblue1,
  },
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

const renderLeft = (props) => {
  const { elements } = props;
  return (
    <div className="left" style={styles.left_container}>
      {elements}
    </div>
  );
};

const renderRight = (props) => {
  const { elements } = props;
  return (
    <div className="right" style={styles.right_container}>
      {elements}
    </div>
  );
};

const renderLeftDefault = (props) => {
  const { drawer, setDrawer } = props;
  return (
    <div className="menu_button_container" style={styles.button_continer}>
      <IconButton onClick={() => setDrawer(!drawer)}>
        <MenuIcon
          sx={styles.button}
        />
      </IconButton>
    </div>
  );
};

function Header(props) {
  const [drawer, setDrawer] = useState(false);
  const {
    title = 'Mamazon', isLeft = true, leftElements = renderLeftDefault({ drawer, setDrawer }), isRight = true, rightElements = <MenuComponent />,
  } = props;
  const navigate = useNavigate();
  return (
    <header className="header" style={styles.header_container}>
      {isLeft && renderLeft({ elements: leftElements })}
      <div
        className="title"
        style={styles.title_container}
        onClick={() => navigate('/')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
          // Enter or Space で実行
            navigate('/');
          }
        }}
        role="button"
        tabIndex={0}
      >
        <h1 style={{ color: 'white' }}>{title}</h1>
      </div>
      {isRight && renderRight({ elements: rightElements })}
      <Drawer
        drawer={drawer}
        setDrawer={setDrawer}
      />
    </header>
  );
}

export default Header;
