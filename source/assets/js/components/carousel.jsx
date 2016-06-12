'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { makeRequest } from './base.js';

import CarouselItem from './carousel-item.jsx';

export default class Carousel extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {data: []};

    this._generateItem = this._generateItem.bind(this);
  }

  componentDidMount = () => {
    let me = this;

    makeRequest(this.props.url, function(data) {
      me.setState({
        data: data.trails
      });
    });
  }

  _generateItem = (item, index) => {
    return <CarouselItem title={item.title} list={item.items} index={index} />
  }

  render = () => {
    let items = this.state.data.map(this._generateItem);
    return (
      <div>
      {items}
      </div>
    );
  }
}
