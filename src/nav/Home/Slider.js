/* eslint-disable react/prop-types */
import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import server from '../../backend/server_url.json';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderStyles.css';

export default function SimpleSlider(props) {
  const { elements } = props;
  const { url } = server;
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // 1024px以下の画面幅に対する設定
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600, // 600px以下の画面幅に対する設定
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // 480px以下の画面幅に対する設定
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Slider {...settings}>
      {elements.map((element) => (
        <Paper
          sx={{ borderRadius: '10px' }}
          key={element[0]}
          onClick={() => navigate(`/detail/${element[0]}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              // Enter or Space で実行
              navigate(`/detail/${element[0]}`);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {element[5] === 'True' ? <div className="sdgs">SDGs</div> : <div className="sdgsNull" />}
          <img className="img" src={`http://${url}:3000/added_image/${element[3]}`} alt="sdgs" />
          <div className="productName">{element[1]}</div>
          {element[5] === 'True' ? <p style={{ color: '#00adef' }}>{`¥ ${Math.round(element[2] * 0.8)} (¥ ${Math.round(element[2] * 1.1 * 0.8)}税込)`}</p>
            : <p>{`¥ ${element[2]} (¥ ${Math.round(element[2] * 1.1)}税込)`}</p>}
        </Paper>
      ))}
    </Slider>
  );
}
