import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utility';

import './sign-up.style.scss';

//Custom hook!
const useCredentials = () => {
  const [value, setValue] = useState('');

  const reset = () => setValue('');

  const onChange = event => setValue(event.target.value);

  return {
    value,
    reset,
    onChange
  }
}

const SignUp = () => {
  const { value: displayName, reset: resetDisplayName, onChange: onChangeDisplayName } = useCredentials('');
  const { value: email, reset: resetEmail, onChange: onChangeEmail } = useCredentials('');
  const { value: password, reset: resetPassword, onChange: onChangePassword } = useCredentials ('');
  const { value: confirmPassword, reset: resetConfirmPassword, onChange: onChangeConfirmPassword } = useCredentials ('');


  const handleSubmit = async event => {
    event.preventDefault();

    console.log(`Submiting name: ${displayName}, mail: ${email}, pass: ${password}`);

    if (password !== confirmPassword) {
      alert(`Password and Confirm Password doesn't match`);

      return;
    }
  
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      console.log(user);
      await createUserProfileDocument(user, {displayName});

      resetDisplayName();
      resetEmail();
      resetPassword();
      resetConfirmPassword();
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="DisplayName"
          type="text"
          onChange={event => onChangeDisplayName(event)}
          value={displayName}
          label="Name"
        />
        <FormInput
          name="Email"
          type="email"
          onChange={event => onChangeEmail(event)}
          value={email}
          label="Email"
          required
        />
        <FormInput
          name="Password"
          type="password"
          onChange={event => onChangePassword(event)}
          value={password}
          label="Password"
          required
        />
        <FormInput
          name="Confirm Password"
          type="password"
          onChange={event => onChangeConfirmPassword(event)}
          value={confirmPassword}
          label="Confirm Password"
          required
        />

        <CustomButton onClick={handleSubmit}>Sign Up</CustomButton>
      </form>
    </div>
  );
}

export default SignUp;