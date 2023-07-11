/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Alert, Button, Snackbar } from '@mui/material';
import Header from '../../components/Header/Header';
import server from '../../backend/server_url.json';
import Color from '../../components/config/Color';
import { isLogin, auth } from '../../components/config/user';

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  detail: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  leftContent: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    borderRadius: '10px',
    margin: '20px',
    marginRight: '10px',
    backgroundColor: Color.white1,
    padding: '10px',
  },
  rightContents: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '20px',
    marginLeft: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    backgroundColor: Color.white1,
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '10px',
  },
  title: {
    display: 'flex',
    height: '30px',
    justifyContent: 'left',
    alignItems: 'center',
  },
  sizeContent: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: '5px',
    paddingRight: '5px',
    maxWidth: '100px',
    color: Color.white1,
    borderRadius: '15px',
    height: '30px',
    margin: '5px',
  },
  cartAddContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  addCartButton: {
    flex: 1,
    color: Color.white1,
    borderRadius: '10px',
    height: '50px',
    width: '100%',
    fontSize: '20px',
    fontWeight: 'bold',
  },
};

function cartAddButton(product, chipData, setOpenWarning) {
  const isLoginValue = useContext(isLogin);
  const onPressed = () => {
    const { url } = server;
    const { userId } = JSON.parse(sessionStorage.getItem('user'));
    if (isLoginValue.login) {
      const addCart = async () => {
        try {
          const response = await fetch(`http://${url}:8000/api/addCart`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productUuid: product[0],
              userUuid: userId,
              size: chipData,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            console.log('addCart:', data);
          } else {
            console.error('Failed to fetch addCart:', data.status);
          }
        } catch (error) {
          console.error('Error while fetching addCart:', error);
        }
      };
      addCart();
    } else {
      setOpenWarning(true);
    }
  };
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%',
    }}
    >
      <Button
        style={{
          ...styles.addCartButton,
          backgroundColor: chipData === '' ? Color.replyblue4 : Color.replyblue3,
        }}
        variant="contained"
        endIcon={<AddShoppingCartIcon />}
        disabled={chipData === ''}
        onClick={onPressed}
      >
        カートに追加
      </Button>
    </div>
  );
}

const stockContent = (s, m, l, chipData, setChipData) => {
  const contents = [
    {
      size: 'S',
      stock: s,
    },
    {
      size: 'M',
      stock: m,
    },
    {
      size: 'L',
      stock: l,
    },
  ];
  return (
    <div style={{
      display: 'flex', width: '100%', justifyContent: 'space-evenly', height: '90%',
    }}
    >
      {contents.map((content) => (
        <Button
          style={{
            ...styles.sizeContent,
            backgroundColor: content.stock === 0 || content.size !== chipData ? Color.replyblue4 : Color.replyblue3,
          }}
          onClick={() => {
            if (content.size === chipData) {
              setChipData('');
            } else {
              setChipData(content.size);
            }
          }}
          disabled={content.stock === 0}
          variant="contained"
        >
          <div className="title" style={{ fontWeight: 'bold', fontSize: '20px' }}>
            {content.size}
          </div>
          <div className="stock" style={{ fontSize: '20px' }}>
            {content.stock}
          </div>
        </Button>
      ))}
    </div>
  );
};

const rightContents = (product, chipData, setChipData, setOpenWarning) => {
  const contents = [
    {
      title: '商品説明',
      content:
  <div style={{ textAlign: 'left' }}>{product[4]}</div>,
      flex: 1,
      marginBottom: '20px',
    },
    {
      title: '価格',
      content:
  <div>
    {product[5] === 'True' ? <p style={{ color: '#00adef', fontSize: '18px' }}>{`¥ ${Math.round(product[2] * 0.8)} (¥ ${Math.round(product[2] * 1.1 * 0.8)}税込)`}</p>
      : <p style={{ fontSize: '18px' }}>{`¥ ${product[2]} (¥ ${Math.round(product[2] * 1.1)}税込)`}</p>}
  </div>,
      flex: 1,
      marginBottom: '20px',
    },
    {
      title: 'サイズ',
      content:
  <div style={{
    width: '100%', flexDirection: 'column', alignSelf: 'flex-start',
  }}
  >
    <div style={{ height: '10%' }}>
      <h5 style={{ color: Color.gray2 }}>サイズを選択してください</h5>
    </div>
    {stockContent(
      product[6],
      product[7],
      product[8],
      chipData,
      setChipData,
    )}
  </div>,
      flex: 1,
      marginBottom: '20px',
    },
  ];
  return (
    <div className="rightContents" style={styles.rightContents}>
      {contents.map((content) => (
        <div className="content" style={{ ...styles.content, flex: content.flex, marginBottom: content.marginBottom }}>
          <div className="title" style={styles.title}>
            <h5 style={{ color: Color.gray2 }}>{content.title}</h5>
          </div>
          <div style={{
            alignItems: 'center', justifyContent: 'center', display: 'flex', height: '100%',
          }}
          >
            {content.content}
          </div>
        </div>
      ))}
      {cartAddButton(product, chipData, setOpenWarning)}
    </div>
  );
};

function Detail() {
  const { uuid: productUuid } = useParams();
  const [drawer, setDrawer] = useState(false);
  const [product, setProduct] = useState([]);
  const [chipData, setChipData] = useState('');
  const [openWarning, setOpenWarning] = useState(false);
  const { url } = server;
  const handleWarningClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenWarning(false);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://${url}:8000/api/getProductDetail/${productUuid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProduct(data.product[0]);
          console.log('product:', data.product);
          console.log('product[4]:', typeof (data.product));
        } else {
          console.error('Failed to fetch product:', data.status);
        }
      } catch (error) {
        console.error('Error while fetching product:', error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div className="container" style={styles.container}>
      <Header
        drawer={drawer}
        setDrawer={setDrawer}
      />
      <div className="detail" style={styles.detail}>
        <div className="leftContent" style={styles.leftContent}>
          <img src={`http://${url}:3000/added_image/${product[3]}`} alt="sdgs" />
        </div>
        {rightContents(product, chipData, setChipData, setOpenWarning)}
      </div>
      <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleWarningClose}>
        <Alert onClose={handleWarningClose} severity="warning" sx={{ width: '100%' }}>
          ログインまたはサインアップしてください
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Detail;
