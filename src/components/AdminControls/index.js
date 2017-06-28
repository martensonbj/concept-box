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

  handleLogin() {
    this.props.signIn(this.state.email, this.state.password)
    this.setState({ showForm: false })
  }

  render() {
    const { showForm } = this.state;
    const { signIn, signOut, user } = this.props;

    const loginForm = () => {
      return (
        <div className="adminForm">
          <button
            className="close-form"
            onClick={ () => this.setState({ showForm: false }) }
          >
            x
          </button>
          <input
            type='text'
            placeholder="email"
            onChange={ (e) => this.setState({ email: e.target.value }) }/>
          <input
            type='password'
            placeholder="password"
            onChange={ (e) => this.setState({ password: e.target.value }) }/>
          <button onClick={ () => this.handleLogin() }>Sign In</button>
        </div>
      )
    }

    const toggleLoginControls = () => {
      if(!user) {
        return (
            <button className="admin-login" onClick={ () => this.setState({ showForm: true }) }>Admin Login</button>
        )
      }

      if(user) {
        return (
            <button onClick={ () => this.signOut() }>Sign Out</button>
        )
      }
    }

    const adminStyles = cn({
      'admin-container': this.state.showForm,
    })

    return (
      <div className={ adminStyles }>
        <div className="login-controls">
          { toggleLoginControls() }
        </div>
        { showForm ? loginForm() : null }
      </div>
    )
  }
}
