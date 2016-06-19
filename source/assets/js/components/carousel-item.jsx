import React, { Component, PropTypes } from 'react';

import MakeRequest from '../utils/request.js';

import Cards from './cards.jsx';

export default class CarouselItem extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      _current: 0,
      _amount: this.props.list.length,
      _list: this.props.list,
      nada: 0
    };

    this._generateCard  = this._generateCard.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._moveTo        = this._moveTo.bind(this);
    this._setActive     = this._setActive.bind(this);
    this._removeActive  = this._removeActive.bind(this);
  }

  componentDidMount() {
    let index = this.props.index;
    if(index === 0){
      document.getElementById('list-'+index).focus();
      document.getElementById('list-'+index).querySelectorAll('.item')[0].className += ' on';
    }
  }

  _generateCard(item) {
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

  _moveTo(option) {
    let to        = option;
    let goToIndex = this.state._current;

    if (to === 'right') {
      goToIndex++;
    } else if (to === 'left') {
      goToIndex--;
    }

    this._setActive(goToIndex);
  }

  _selected(index, amount){
    let amountItens = document.getElementById('list-'+this.props.index).querySelectorAll('.item').length;
    let size = document.querySelector('.item').offsetWidth;

    console.log(index);
    console.log(this.state._current);

    if( this.state._current < amount && this.state._current >= 0 ){
      this._removeActive();

      document.querySelectorAll('.item')[index].className += ' on';

      // COMEÇO GAMBIARRA ### TRATAR
      document.getElementById('list-'+this.props.index).style.width = (amountItens * 10) + (amountItens * size)+'px';
      document.getElementById('list-'+this.props.index).style.left = - ((size + 10) * index+1) +'px';
      // FIM GAMBIARRA ### TRATAR

    }
  }

  _pagination(amount){
    let me = this;

    // COMEÇO GAMBIARRA ### TRATAR
    if ( this.state._current === amount-3 ){
      // CHECK THE CONDITION
      MakeRequest('/api/pagination.json', function(data) {
        data.results.forEach(function(obj){
          me.state._list.push(obj);
        });

        me.setState({
          _amount: me.state._list.length
        });
        me.forceUpdate();
      });
    }
    // FIM GAMBIARRA ### TRATAR
  }

  _verifyIndex(index, amount){

    if(index < 0 ){
      index = 0;
    } else if (index > amount){
      index = amount
    }

    return index;
  }

  _setActive(index) {
    let me = this;
    let amount = this.state._amount;

    this.setState({
      _current: this._verifyIndex(index)
    }, function () {
      me._selected(me._verifyIndex(index), amount);
      me._pagination(amount);
    });

  }

  _removeActive() {
    let elements = document.querySelectorAll('.item');
    let className = 'on';
    let el;

    for (var i = 0, len = elements.length; i < len; i++) {
      el = elements[i];

      if (el.classList)
        el.classList.remove(className);
      else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render() {
    let list = this.state._list.map(this._generateCard);
    return (
      <div className="row" key={this.props.index}>
        <h3 className="category">{this.props.title}</h3>
        <div className="box">
          <ul className="list" id={"list-"+this.props.index} onKeyDown={this._handleKeyDown} tabIndex={this.props.index}>
          {list}
          </ul>
        </div>
      </div>
    );
  }
}
