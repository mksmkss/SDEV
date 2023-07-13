import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import React from 'react';
import Login from './nav/Login/Login';
import Signup from './nav/Signup/Signup';
import NotFound from './nav/NotFound/NotFound';
import Default from './nav/Default/Default';
import EditDB from './nav/EditDB/EditDB';
import Cart from './nav/Cart/Cart';
import Search from './nav/Search/Search';
import Settings from './nav/Settings/Settings';
import Detail from './nav/Detail/Detail';
import Purchase from './nav/Purchase/Purchase';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Default />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="editdb" element={<EditDB />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="search" element={<Search />} />
        <Route path="settings" element={<Settings />} />
        <Route path="detail/:uuid" element={<Detail />} />
        <Route path="purchase" element={<Purchase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
