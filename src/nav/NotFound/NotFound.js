/* eslint-disable react/button-has-type */
import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

function NotFound() {
  return (
    <div className="notFound">
      <Header />
      <h1>このページは存在していません</h1>
      <Buttons />
    </div>
  );
}

function Buttons() {
  const navigate = useNavigate();
  return (
    <div className="buttons">
      <button onClick={() => navigate(-1)}>戻る</button>
    </div>
  );
}

export default NotFound;
