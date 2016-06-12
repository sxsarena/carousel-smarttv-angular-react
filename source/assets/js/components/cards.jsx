'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Cards extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => {
    return (
      <li className="item" tabindex="-1" key={this.props.id}>
        <img className="image" src={this.props.image} height={200} width={134} />
      </li>
    );
  }
}
