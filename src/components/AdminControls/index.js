import React, { Component } from 'react';
import { signIn, signOut, provider } from '../../firebase';

export default class AdminControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showForm: false,
      user: null
    }
  }

  signOut() {
    signOut
    this.setState({ showForm: false }, () => {
      this.props.signOut()
    })
  }

  render() {
    const { showForm } = this.state;
    const { signIn, signOut, user } = this.props;

    const adminView = () => {
      if(!user) {
        if(showForm) {
          return (
            <div>
              <input type='text' onChange={(e) => this.setState({ email: e.target.value })}/>
              <input type='password' onChange={(e) => this.setState({ password: e.target.value })}/>
              <button onClick={ () => signIn(this.state) }>Sign In</button>
            </div>
          )
        }
      } else if (user && showForm) {
        console.log(user);
        return (
          <div>
            <h3>Logged in as {user.email}</h3>
            <button onClick={() => this.signOut()}>Sign Out</button>
          </div>
        )
      }
    }

    const toggleShowForm = () => {
      if(!this.state.showForm) {
        return (
          <button onClick={() => this.setState({ showForm: true })}>Admin Login</button>
        )
      }
    }

    return (
      <div className='admin-container'>
        {toggleShowForm()}
        {adminView()}
      </div>
    )
  }
}
