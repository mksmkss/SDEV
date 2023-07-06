/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

function Search() {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="search">
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <h1>Search</h1>
      <Buttons />
    </div>
  );
}

function Buttons() {
  const navigate = useNavigate();
  return (
    <div className="buttons">
      <button onClick={() => navigate(-1)}>画面遷移します！</button>
    </div>
  );
}

export default Search;
