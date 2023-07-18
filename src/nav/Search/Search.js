/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import Header from '../../components/Header/Header';
import server from '../../backend/server_url.json';
import Color from '../../components/config/Color';

const styles = {
  contents: {
    flex: 1,
    display: 'flex',
    padding: '20px',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Color.white1,
    borderRadius: '10px',
  },

};

function Search() {
  const [drawer, setDrawer] = useState(false);
  const [products, setProducts] = useState([]);
  const { word } = useParams();
  const navigate = useNavigate();
  const { url } = server;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${url}:8000/api/getSearchProducts/${word}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log('products:', data.products);
          setProducts(data.products);
          console.log('products:', products);
        } else {
          console.error('Failed to fetch products:', data.status);
        }
      } catch (error) {
        console.error('Error while fetching products:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="search">
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <Grid container spacing={2} style={styles.contents} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {products.map((product, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item xs={4} key={index}>
            <Paper
              sx={styles.content}
              onClick={() => navigate(`/detail/${product[0]}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Enter or Space で実行
                  navigate(`/detail/${product[0]}`);
                }
              }}
            >
              {product[5] === 'True' ? <div className="sdgs">SDGs</div> : <div className="sdgsNull" />}
              <img className="img" src={`http://${url}:3000/added_image/${product[3]}`} alt="sdgs" />
              <div className="productName">{product[1]}</div>
              {product[5] === 'True' ? <p style={{ color: '#00adef' }}>{`¥ ${Math.round(product[2] * 0.8)} (¥ ${Math.round(product[2] * 1.1 * 0.8)}税込)`}</p>
                : <p>{`¥ ${product[2]} (¥ ${Math.round(product[2] * 1.1)}税込)`}</p>}
            </Paper>
          </Grid>
        ))}
      </Grid>

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
