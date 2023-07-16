import React, { useEffect, useState } from 'react';
import {
  Paper, TextField, Step, Stepper, Button, StepLabel, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AtmIcon from '@mui/icons-material/Atm';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import Header from '../../components/Header/Header';
import Color from '../../components/config/Color';
import server from '../../backend/server_url.json';

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },

  bag: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '10px',
    height: '100%',
  },
  handleStyle: {
    background: Color.white1,
    borderRadius: '50%',
    top: '5%',
    height: '220px',
    width: '320px',
    position: 'relative',
  },
  innerCircleStyle: {
    position: 'absolute',
    background: '#efefef',
    borderRadius: '50%',
    height: '180px',
    width: '280px',
    top: '50%',
    left: '50%',
    margin: '-90px 0 0 -140px',
  },
  bagBody: {
    position: 'absolute',
    top: '200px',
    width: '60%',
    height: window.innerHeight * 0.6,
    backgroundColor: Color.white1,
    borderRadius: '10px',
    paddingTop: '25px',
  },
  textInput: {
    width: '80%',
    margin: '10px',
  },
  purchaseButton: {
    color: 'white',
    backgroundColor: Color.replyblue3,
    fontSize: '20px',
    borderRadius: '10px',
    width: '30%',
    height: '50px',
    marginTop: '15px',
  },
  selectPurchaseWay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
  },
};

const inputAuth = (setActiveStep, texts, setTexts) => {
  const contents = [
    {
      id: 'postal_code',
      title: '郵便番号',
      type: 'text',
      name: 'postal_code',
      placeholder: '郵便番号を入力してください',
      disabled: false,
    },
    {
      id: 'address',
      title: '住所',
      type: 'text',
      name: 'address',
      placeholder: '住所を入力してください',
      disabled: false,
    },
    {
      id: 'phone_number',
      title: '電話番号',
      type: 'text',
      name: 'phone_number',
      placeholder: '電話番号を入力してください',
      disabled: false,
    },
    {
      id: 'email',
      title: 'メールアドレス',
      type: 'text',
      name: 'email',
      placeholder: 'メールアドレスを入力してください',
      disabled: false,
    },
  ];

  const handleInputChange = (e, id) => {
    const newTexts = texts.map((text, index) => {
      if (contents[index].id === id) {
        return e.target.value;
      }
      return text;
    });
    setTexts(newTexts);
  };

  return (
    <div>
      {contents.map((content) => (
        <div key={content.id}>
          <TextField
            focused
            required
            id="outlined-basic"
            label={content.title}
            variant="outlined"
            type={content.type}
            name={content.name}
            value={texts.find((text, index) => contents[index].id === content.id)}
            onChange={(e) => handleInputChange(e, content.id)}
            placeholder={content.placeholder}
            style={styles.textInput}
          />
        </div>
      ))}
      <Button
        variant="contained"
        onClick={() => setActiveStep(1)}
        style={{ ...styles.purchaseButton, backgroundColor: texts.some((text) => text === '') ? Color.replyblue4 : Color.replyblue3 }}
        disabled={texts.some((text) => text === '')}
      >
        次へ
      </Button>
    </div>
  );
};

const selectPurchaseWay = (url, user, price, setActiveStep, purchaseWay, setPurchaseWay, setPurchase) => {
  const contents = [
    {
      id: 'credit_card',
      title: 'クレジットカード',
      icon: <CreditCardIcon style={{ fontSize: '30px', marginRight: '10px' }} />,
    },
    {
      id: 'atm',
      title: 'ATM',
      icon: <AtmIcon style={{ fontSize: '30px', marginRight: '10px' }} />,
    },
    {
      id: 'cash_on_delivery',
      title: '代金引換',
      icon: <LocalConvenienceStoreIcon style={{ fontSize: '30px', marginRight: '10px' }} />,
    },
  ];
  const onPurchaseClick = async () => {
    const response = await fetch(`http://${url}:8000/api/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userUuid: user,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('purchase', data);
    } else {
      console.error('Failed to fetch user:', data.status);
    }
    setActiveStep(2);
    setPurchase(true);
  };

  return (
    <div style={styles.selectPurchaseWay}>
      <FormControl component="fieldset">
        <FormLabel component="legend" id="label">支払い方法</FormLabel>
        <RadioGroup
          aria-labelledby="label"
          name="purchaseWay"
          value={purchaseWay}
          onChange={(e) => setPurchaseWay(e.target.value)}
        >
          {contents.map((content) => (
            <FormControlLabel
              key={content.id}
              value={contents.findIndex((c) => c.id === content.id)}
              control={<Radio />}
              label={(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {content.icon}
                  {content.title}
                </div>
           )}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div style={{ marginTop: '20px' }}>
        <span style={{ fontSize: '20px' }}>合計金額: </span>
        <span style={{ fontSize: '20px', color: Color.replyblue3 }}>{price}</span>
        <span style={{ fontSize: '20px' }}>円</span>
      </div>
      <Button
        variant="contained"
        style={styles.purchaseButton}
        onClick={onPurchaseClick}
      >
        購入
      </Button>
    </div>
  );
};

const purchaseComplete = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '70px',
  }}
  >
    <h2>購入完了</h2>
    <h4>またのご利用をお待ちしております。</h4>
  </div>
);

function Purchase() {
  const [purchase, setPurchase] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [user, setUser] = useState('');
  const [price, setPrice] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [purchaseWay, setPurchaseWay] = useState(0);
  const { userId } = JSON.parse(sessionStorage.getItem('user'));
  const [texts, setTexts] = useState(['', '', '', '']);
  const { url } = server;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://${url}:8000/api/getUser/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user[0][0]);
          console.log('user', user);
          setTexts(['', '', '', data.user[0][2]]);
          console.log('texts', texts);
        } else {
          console.error('Failed to fetch user:', data.status);
        }
      } catch (error) {
        console.error('Error while fetching user:', error);
      }
    };
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
          setPrice(data.price);
          console.log('price', data.price);
        }
      } catch (error) {
        console.error('Error while fetching products:', error);
      }
    };
    fetchProducts();
    fetchUser();
  }, []);

  return (
    <div style={styles.container}>
      <Header title="Purchase" drawer={drawer} setDrawer={setDrawer} />
      <div className="bag" style={styles.bag}>
        <AnimatePresence>
          {purchase && (
            <motion.div
              className="handle"
              style={styles.handleStyle}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inner-circle"
                style={styles.innerCircleStyle}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Paper className="body" style={styles.bagBody} />
      </div>
      <div className="bag" style={styles.bag}>
        <Paper className="body" style={styles.bagBody}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>個人情報入力</StepLabel>
            </Step>
            <Step>
              <StepLabel>支払い方法選択</StepLabel>
            </Step>
            <Step>
              <StepLabel>購入完了</StepLabel>
            </Step>
          </Stepper>
          {activeStep === 0 && inputAuth(setActiveStep, texts, setTexts)}
          {activeStep === 1 && selectPurchaseWay(url, user, price, setActiveStep, purchaseWay, setPurchaseWay, setPurchase)}
          {activeStep === 2 && purchaseComplete()}
        </Paper>
      </div>
    </div>
  );
}

export default Purchase;
