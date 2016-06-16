import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './components/carousel.jsx';

const Movies = () => (
  <Carousel url="/api/home_trail.json" />
);

ReactDOM.render(<Movies />, document.getElementById('movies'));
