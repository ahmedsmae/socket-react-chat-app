import React, { useState } from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const SignIn = ({ signinUserStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = userCredentials;

    signinUserStart({ email, password });

    setCredentials({ email: '', password: '' });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const { email, password } = userCredentials;

  return (
    <div className='sign-in'>
      <h2 className='title'>Sign in with email and password</h2>

      <form className='sign-in-form' onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          handleChange={handleChange}
          value={email}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          handleChange={handleChange}
          value={password}
          label='Password'
          required
        />

        <CustomButton type='submit'>Sign in</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
