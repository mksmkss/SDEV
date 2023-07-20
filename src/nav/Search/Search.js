/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Grid, Paper, TextField, InputAdornment, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
  searchField: {
    width: '240px',
    margin: '20px',
  },

};

function Search() {
  const [drawer, setDrawer] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const { word } = useParams();
  const navigate = useNavigate();
  const { url } = server;
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
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="search">
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <div style={{
        display: 'flex', justifyContent: 'right', alignItems: 'center', height: '60px',
      }}
      >
        <TextField
          label="検索"
          variant="outlined"
          color="primary"
          value={searchWord}
          size="small"
          onChange={(e) => setSearchWord(e.target.value)}
          sx={{
            ...styles.searchField,
            overflow: 'visible',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={
                    () => {
                      navigate(`/search/${searchWord}`);
                      fetchData();
                    }
                  }
                  disabled={searchWord === ''}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     // Enter or Space で実行
          //     navigate(`/search/${searchWord}`);
          //     fetchData();
          //   }
          // }}
        />
      </div>
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
              {
              // eslint-disable-next-line no-nested-ternary
              product[5] === 'True' && product[9] === 'True' ? (
                <div className="sdgs"> SDGs(Ad)</div>
              ) : product[5] === 'True' ? (
                <div className="sdgs"> SDGs </div>
              ) : (
                <div className="sdgsNull" />
              )
              }
              <img className="img" src={`http://${url}:3000/added_image/${product[3]}`} alt="sdgs" />
              <div className="productName">{product[1]}</div>
              {product[5] === 'True' ? <p style={{ color: '#00adef' }}>{`¥ ${Math.round(product[2] * 0.8)} (¥ ${Math.round(product[2] * 1.1 * 0.8)}税込)`}</p>
                : <p>{`¥ ${product[2]} (¥ ${Math.round(product[2] * 1.1)}税込)`}</p>}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Search;
