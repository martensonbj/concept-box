import React, { Component } from 'react';
import { signIn, signOut, provider } from '../../firebase';

export default class AdminControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <div className='admin-container'>
        <input type='text' onChange={(e) => this.setState({ email: e.target.value })}/>
        <input type='password' onChange={(e) => this.setState({ password: e.target.value })}/>
        <button onClick={ () => this.props.signIn(this.state) }>Sign In</button>
      </div>
    )
  }
}
