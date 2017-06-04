import React, { Component } from 'react';
import './styles.css';

export default class Form extends Component {
  constructor() {
    super()
    this.state = { concept: '' }
  }

  handleClick(e) {
    e.preventDefault()
    this.props.handleClick(this.state.concept)
    this.setState({ concept: '' })
  }

  render() {
    return (
      <form>
        <input  type="text"
                placeholder="Concept"
                className='concept-input'
                value = { this.state.concept }
                onChange = { e => this.setState({ concept: e.target.value }) }
        />
        <input  type="submit"
                value="Save"
                className='concept-submit'
                onClick={ e => this.handleClick(e) }
        />
      </form>
    )
  }
}
