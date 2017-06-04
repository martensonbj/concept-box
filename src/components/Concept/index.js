import React, { Component } from 'react';
import './styles.css';

export default class Concept extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5
    }
  }

  render() {
    const { rating } = this.state

    return (
        <li className='concept-card'>
          {this.props.concept}
          <div className='concept-rating'>
            <input type='range'
                   min='1'
                   max='10'
                   className='concept-slider'
                   value={rating}
                   onChange={(e) => this.setState({ rating: parseInt(e.target.value) })}/>
              <div className='rating-display'>{rating}</div>
          </div>
        </li>
    )
  }
}
