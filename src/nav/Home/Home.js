/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import server from '../../backend/server_url.json';
import SimpleSlider from './Slider';

const styles = {
  home: {
    flex: 1,
  },
  sdgsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  subtitle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '80px',
  },
};

function Home() {
  const [drawer, setDrawer] = useState(false);
  const [sdgsProducts, setSdgsProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const { url } = server;
  useEffect(() => {
    const fetchSdgsProducts = async () => {
      try {
        const response = await fetch(`http://${url}:8000/api/sdgsProducts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSdgsProducts(data.products);
          console.log('sdgsProducts:', data.products);
        } else {
          console.error('Failed to fetch sdgsProducts:', data.status);
        }
      } catch (error) {
        console.error('Error while fetching sdgsProducts:', error);
      }
    };
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
    fetchSdgsProducts();
    fetchRandomProducts();
  }, []);
  return (
    <div className="home" style={styles.home}>
      <SDGsComponent
        sdgsProducts={sdgsProducts}
      />
      <RandomComponent
        randomProducts={randomProducts}
      />
    </div>
  );
}

function SDGsComponent({ sdgsProducts }) {
  return (
    <div className="SDGs" style={styles.sdgsContainer}>
      <div style={styles.subtitle}>
        <h1>SDGs</h1>
      </div>
      <SimpleSlider
        elements={sdgsProducts}
      />
    </div>
  );
}

function RandomComponent({ randomProducts }) {
  return (
    <div className="Random" style={styles.sdgsContainer}>
      <div style={styles.subtitle}>
        <h1>スタッフのおすすめ</h1>

      </div>
      <SimpleSlider
        elements={randomProducts}
      />
    </div>
  );
}

export default Home;
