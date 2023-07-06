/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  home: {
    flex: 1,
  },
};
function Home() {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="home" style={styles.home}>
      <h1>Home</h1>
      <Buttons
        drawer={drawer}
        setDrawer={setDrawer}
      />
    </div>
  );
}

function Buttons() {
  const navigate = useNavigate();
  return (
    <div className="buttons">
      <button onClick={() => navigate('/search')}>Search</button>
      <button onClick={() => navigate('/login')}>user</button>
      <button onClick={() => navigate('/EditDB')}>create</button>
    </div>
  );
}

export default Home;
