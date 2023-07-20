import React, { useState, useEffect } from 'react';
import SimpleSlider from '../Home/Slider';
import ChatComponent from './Chat';
import Color from '../../components/config/Color';
import server from '../../backend/server_url.json';

const styles = {
  container: {
    // 背景色をなくす
    // backgroundColor: 'transparent',
    backgroundColor: 'blue',
  },
  sdgsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  floatingButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: Color.replyblue1,
  },
  subtitle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '80px',
  },
};
function BottomComponent() {
  const [randomProducts, setRandomProducts] = useState([]);
  const { url } = server;
  const fetchRandomProducts = async () => {
    try {
      const response = await fetch(`http://${url}:8000/api/randomProducts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRandomProducts(data.products);
        console.log('randomProducts:', data.products);
      } else {
        console.error('Failed to fetch randomProducts:', data.status);
      }
    } catch (error) {
      console.error('Error while fetching randomProducts:', error);
    }
  };
  useEffect(() => {
    fetchRandomProducts();
  }, []);
  return (
    <div className="Random" style={styles.sdgsContainer}>
      <div style={styles.subtitle}>
        <h1>関連商品</h1>
      </div>
      <SimpleSlider
        elements={randomProducts}
      />
      <ChatComponent />
    </div>
  );
}

export default BottomComponent;
