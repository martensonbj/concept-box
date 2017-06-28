import React, { Component } from 'react';
import { signIn, signOut, provider } from '../../firebase';
import './styles.css';
import cn from 'classnames'

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

  updateInput(e, field) {
    this.setState({ [field]: e.target.value })
    this.props.resetInput()
  }

  render() {
    const { showForm } = this.state;
    const { signIn, signOut, user } = this.props;

    const adminView = () => {
      if(!user) {
        if(showForm) {
          return (
            <div>
              <input type='text' onChange={ (e) => this.updateInput(e, 'email') }/>
              <input type='password' onChange={(e) => this.updateInput(e, 'password') }/>
              <button onClick={ () => signIn(this.state) }>Sign In</button>
              { this.props.error }
            </div>
          )
        }
      } else if (user && showForm) {
        return (
          <div>
            <h3>Logged in as { user.email }</h3>
            <button onClick={ () => this.signOut() }>Sign Out</button>
          </div>
        )
      }
    }

    const toggleShowForm = () => {
      if(!this.state.showForm) {
        return (
          <button className="admin-login" onClick={ () => this.setState({ showForm: true }) }>Admin Login</button>
        )
      }
    }

    const adminStyles = cn({
      'admin-container': this.state.showForm,
    })

    return (
      <div className={ adminStyles }>
        { toggleShowForm() }
        { adminView() }
      </div>
    )
  }
}
