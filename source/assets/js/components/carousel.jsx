import React, { Component, PropTypes } from 'react';

import MakeRequest from '../utils/request.js';
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

  componentDidMount() {
    let me = this;

    MakeRequest(this.props.url, function(data) {
      me.setState({
        data: data.trails
      });
    });
  }

  _generateItem(item, index) {
    return (
      <CarouselItem title={item.title} list={item.items} index={index} />
    );
  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render() {
    let items = this.state.data.map(this._generateItem);
    return (
      <div>
      {items}
      </div>
    );
  }
}
