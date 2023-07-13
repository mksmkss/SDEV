import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import server from '../../backend/server_url.json';

// const purchaseContainer =() => {

function Purchase() {
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    //   const fetchCart = async () => {
    console.log('purchase');
    //   };
    //   fetchCart();
  }, []);

  return (
    <div>
      <Header
        title="Purchase"
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <h1>Purchase</h1>
      <button type="button" onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

export default Purchase;
