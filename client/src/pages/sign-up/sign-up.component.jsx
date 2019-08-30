import React, { useState } from 'react';
import { connect } from 'react-redux';

import './sign-up.styles.scss';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const SignUp = ({ registerUserStart }) => {
  const [userCredentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = userCredentials;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    registerUserStart({ name, email, password });

    setCredentials({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const { name, email, password, confirmPassword } = userCredentials;

  return (
    <div className='sign-up'>
      <h2 className='title'>Sign up with name, email and password</h2>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='name'
          value={name}
          handleChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />

        <CustomButton type='submit'>Sign up</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
