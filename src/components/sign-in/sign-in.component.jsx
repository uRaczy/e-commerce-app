import React, { Component } from 'react';

import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle, signInWithFacebook } from '../../firebase/firebase.utility';

class SignIn extends Component {
  constructor (props) {
    super();

    this.state = {
      email: '',
      password: ''
    }

  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ email: '', password: '' });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [ name ]: value });
  }

  render() {
    return (
      <div className='sign-in'>
        <h1>I already have an account</h1>
        <h2>Sign in with your email and password</h2>

        <form onSubmit={this.handleSubmit}>
          
          <FormInput 
            name='email' 
            value={this.state.email} 
            onChange={this.handleChange}
            label='email'
            required 
          />

          <FormInput 
            name='password'
            type='password'
            value={this.state.password} 
            onChange={this.handleChange}
            label='password'
            required
          />

          <CustomButton type="submit"> 
            Sign In 
          </CustomButton>
          <CustomButton onClick={signInWithGoogle}>
            Sign In With Google
          </CustomButton>
          <CustomButton onClick={signInWithFacebook}>
            Sign In With Facebook
          </CustomButton>
          
        </form>
      </div>
    );
  }
}

export default SignIn;