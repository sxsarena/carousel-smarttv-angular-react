'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Cards from './cards.jsx';

export default class CarouselItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      _focus: 0
    };

    this._generateCard  = this._generateCard.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._moveTo        = this._moveTo.bind(this);
    this._setFocus      = this._setFocus.bind(this);
    this._removeFocus   = this._removeFocus.bind(this);
  }

  componentDidMount = () => {
    document.getElementById('list-0').focus();
  }

  _generateCard = (item) =>{
    return (
      <Cards image={item.image_tv} id={item.id} />
    );
  }

  _handleKeyDown = (event) => {
    let left  = 37;
    let right = 39;
    let key   = event.which || event.charCode;

    if (key === left) {
      this._moveTo('left');
    } else if (key === right) {
      this._moveTo('right');
    }
  }

  _moveTo = (option) => {
    let to        = option;
    let goToIndex = this.state._focus;

    if (to === 'right') {
      goToIndex++;
    } else if (to === 'left') {
      goToIndex--;
    }

    this._setFocus(goToIndex);
  }

  _setFocus = (index) => {
    this._removeFocus();
    this.state._focus = index;
  }

  _removeFocus = () => {

  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render = () => {
    let list = this.props.list.map(this._generateCard);
    return (
      <div className="row" key={this.props.index}>
        <h3 className="category">{this.props.title}</h3>
        <div className="box">
          <ul className="list" id={"list-"+this.props.index} contentEditable onKeyDown={this._handleKeyDown} tabindex={this.props.index}>
          {list}
          </ul>
        </div>
      </div>
    );
  }
}
