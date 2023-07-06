/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditDB() {
  return (
    <div className="editDB">
      <h1>EditDB</h1>
      <Buttons />
    </div>
  );
}

function Buttons() {
  const navigate = useNavigate();
  return (
    <div className="buttons">
      <button onClick={() => navigate(-1)}>画面遷移します！</button>
      {/* <button onClick={() => addUser({ name: 'aaaaaaddda' })}>create</button>
      <button onClick={() => loadUserData()}>read</button> */}
    </div>
  );
}

export default EditDB;
