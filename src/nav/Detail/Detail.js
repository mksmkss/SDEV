/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import server from '../../backend/server_url.json';
import Color from '../../components/config/Color';

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
    padding: '10px',
  },
  title: {
    display: 'flex',
    height: '30px',
    marginLeft: '10px',
    // backgroundColor: Color.replyblue2,
    justifyContent: 'left',
    alignItems: 'center',
  },
};

const rightContents = ({ product }) => {
  const contents = [
    {
      title: '商品説明',
      content:
  <p>{product[4]}</p>,
      flex: 2,
      marginBottom: '20px',
    },
    {
      title: '価格',
      content:
  <div>
    {product[7] === 'True' ? <p style={{ color: '#00adef' }}>{`¥ ${Math.round(product[2] * 0.8)} (¥ ${Math.round(product[2] * 1.1 * 0.8)}税込)`}</p>
      : <p>{`¥ ${product[2]} (¥ ${Math.round(product[2] * 1.1)}税込)`}</p>}
  </div>,
      flex: 1,
      marginBottom: '0px',
    },
  ];
  return (
    <div className="rightContents" style={styles.rightContents}>
      {contents.map((content) => (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        // <>
        //   {content.content}
        // </>
        <div className="content" style={{ ...styles.content, flex: content.flex, marginBottom: content.marginBottom }}>
          <div className="title" style={styles.title}>
            <h4 style={{ color: Color.gray2 }}>{content.title}</h4>
          </div>
          {content.content}
        </div>
      ))}
    </div>
  );
};

function Detail() {
  const { uuid: productUuid } = useParams();
  const [drawer, setDrawer] = useState(false);
  const [product, setProduct] = useState([]);
  const { url } = server;
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
        {rightContents({ product })}
      </div>
    </div>
  );
}

export default Detail;
