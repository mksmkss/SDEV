/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton, Grid, Paper, Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
    backgroundColor: Color.white1,
    borderRadius: '10px',
  },
  imageContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '10px',
  },
  title: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseButton: {
    backgroundColor: Color.replyblue2,
    color: 'white',
    fontSize: '20px',
    borderRadius: '10px',
    width: '25%',
    height: '50px',
    marginTop: '20px',
  },
};

function cartContent(products, setProducts) {
  const { url } = server;
  const onClick = (id) => () => {
    const newProducts = products.filter((item) => item[9] !== id);
    setProducts(newProducts);
    const deleteCart = async () => {
      try {
        const response = await fetch(`http://${url}:8000/api/deleteCart/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log('deleteCart:', data);
        } else {
          console.error('Failed to deleteCart:', data.status);
        }
      } catch (error) {
        console.error('Error while deleting deleteCart:', error);
      }
    };
    deleteCart();
  };

  return (
    <Grid container spacing={2} style={styles.contents} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {products.length === 0 ? <h2>カートに商品がありません</h2> : null}
      {products.map((product) => (
        <Grid item xs={6} key={product.id}>
          <Paper style={styles.content}>
            <div style={styles.imageContent}>
              <img src={`http://${url}:3000/added_image/${product[3]}`} alt="product" style={styles.image} />
            </div>
            <div style={styles.title}>
              <h3>{product[1]}</h3>
            </div>
            <div>
              <p>{`サイズ: ${product[10]}`}</p>
              <div style={styles.price}>
                {product[5] === 'True' ? <p>{`¥ ${Math.round(product[2] * 0.8)} (¥ ${Math.round(product[2] * 1.1 * 0.8)}税込)`}</p>
                  : <p>{`¥ ${product[2]} (¥ ${Math.round(product[2] * 1.1)}税込)`}</p>}
              </div>
            </div>
            <div style={styles.buttonContent}>
              <IconButton
                aria-label="delete"
                style={{ color: Color.replyblue2 }}
                onClick={onClick(product[9])}
              >
                <DeleteIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

function Cart() {
  const [drawer, setDrawer] = React.useState(false);
  const { userId } = JSON.parse(sessionStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const { url } = server;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://${url}:8000/api/getCart/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data.products);
          console.log('products:', data.products);
          console.log('size', data.size);
        }
      } catch (error) {
        console.error('Error while fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="cart">
      <Header
        title="Cart"
        drawer={drawer}
        setDrawer={setDrawer}
      />
      {cartContent(products, setProducts)}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px',
      }}
      >
        <Button
          variant="contained"
          style={styles.purchaseButton}
          onClick={() => {
            navigate('/purchase');
          }}
        >
          購入手続きへ
        </Button>
      </div>
    </div>
  );
}

export default Cart;
