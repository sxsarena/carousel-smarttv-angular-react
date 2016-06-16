'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import MakeRequest from '../utils/request.js';

import Cards from './cards.jsx';

export default class CarouselItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      _current: 0,
      _amount: this.props.list.length,
      _list: this.props.list
    };

    this._generateCard  = this._generateCard.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._moveTo        = this._moveTo.bind(this);
    this._setActive     = this._setActive.bind(this);
    this._removeActive  = this._removeActive.bind(this);
  }

  componentDidMount = () => {
    document.getElementById('list-0').focus();
  }

  _generateCard = (item) =>{
    let image = item.image_tv || item.media.card_image;

    return (
      <Cards image={image} id={item.id} />
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
    let goToIndex = this.state._current;

    if (to === 'right') {
      goToIndex++;
    } else if (to === 'left') {
      goToIndex--;
    }

    this._setActive(goToIndex);
  }

  _setActive = (index) => {
    let me = this;
    let amount = this.state._amount - 1;

    if( this.state._current <= amount && this.state._current >= 0 ){
      this._removeActive();
      this.state._current = index;
    }

    if ( this.state._current === amount ){
      // CHECK THE CONDITION
      MakeRequest('/api/pagination.json', function(data) {
        data.results.forEach(function(obj){
          me.state._list.push(obj);
        });

        me.state._amount = me.state._list.length;

        me.forceUpdate();
      });

    }

  }

  _removeActive = () => {

  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render = () => {
    let list = this.state._list.map(this._generateCard);
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
