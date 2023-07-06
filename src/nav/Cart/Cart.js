/* eslint-disable react/button-has-type */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

function Cart() {
  const [drawer, setDrawer] = React.useState(false);
  return (
    <div className="cart">
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <h1>Cart</h1>
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

export default Cart;
