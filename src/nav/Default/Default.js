import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// import MenuIcon from '@mui/icons-material/Menu'; // eslint-disable-line import/no-extraneous-dependencies
// import { IconButton } from '@mui/material';

import Header from '../../components/Header/Header';
// import EditDB from '../EditDB/EditDB';
// import Settings from '../Settings/Settings';
import Home from '../Home/Home';
// import MenuComponent from '../../components/Screens/Menu';
// import Search from '../Search/Search';

const styles = {
  default: {
    flex: 1,
  },
};

function Default() {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="Default" style={styles.default}>
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/editdb" element={<EditDB />} /> */}
      </Routes>
    </div>
  );
}

export default Default;
