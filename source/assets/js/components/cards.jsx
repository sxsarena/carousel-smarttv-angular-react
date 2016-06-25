import React, { Component, PropTypes } from 'react';

/**
 * Cards class.
 */
export default class Cards extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render() {
    return (
      <li className="item" tabIndex="-1" key={this.props.id}>
        <img className="image" src={this.props.image} height={200} width={134} />
      </li>
    );
  }
}
