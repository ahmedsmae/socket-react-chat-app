import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signInUserStart } from '../../redux/current-user/current-user.actions';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './sign-in.styles.scss';

const SignIn = ({ signInUserStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { email, password } = userCredentials;

    signInUserStart({ email, password });

    setCredentials({ email: '', password: '' });
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
      <Link to='/register'>Don't have an account !</Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signInUserStart: userCredentials => dispatch(signInUserStart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
