import React, { Component } from 'react';
import './styles.css';

export default class Concept extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      changed: false
    }
  }

  updateRatings() {
    if (!this.state.changed) {
      this.props.updateCount()
    }
    this.setState({ changed: true }, () => {
      this.props.updateRatings({ [this.props.concept]: this.state.rating })
    })
  }

  render() {
    const { rating, changed } = this.state
    const toggleActiveClass = () => changed ? 'active-rating' : 'disabled-rating';

    return (
        <li className={`concept-card ${toggleActiveClass()}`}>
          { this.props.concept }
          <div className='concept-rating'>
            <input type='range'
                   min='1'
                   max='10'
                   className='concept-slider'
                   value={ rating }
                   onChange={ (e) => this.setState({ rating: parseInt(e.target.value) }) }
                   onMouseUp={ () => this.updateRatings() } />
                   {/* onMouseDown={ () =>  } /> */}
              <div className='rating-display'>{ rating }</div>
          </div>
        </li>
    )
  }
}
