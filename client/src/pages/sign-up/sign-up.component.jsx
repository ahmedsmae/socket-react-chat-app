import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signUpUserStart } from '../../redux/current-user/current-user.actions';

import UserImage from '../../components/user-image/user-image.component';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './sign-up.styles.scss';

const SignUp = ({ signUpUserStart }) => {
  const [userCredentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [photo, setPhoto] = useState({ photoFileName: '', photoObject: null });

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = userCredentials;
    const { photoFileName, photoObject } = photo;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!photoFileName || !photoObject) {
      alert('Please add photo');
      return;
    }

    signUpUserStart({ name, email, password, photo });

    setCredentials({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const { name, email, password, confirmPassword } = userCredentials;

  let filePick;

  return (
    <div className='sign-up'>
      <h2 className='title'>Sign up with name, email and password</h2>

      <input
        style={{ display: 'none' }}
        type='file'
        name='file'
        onChange={event => {
          setPhoto({
            photoObject: event.target.files[0],
            photoFileName: event.target.files[0].name
          });
        }}
        ref={fileInput => (filePick = fileInput)}
      />

      <UserImage src={photo.photoFileName} onClick={() => filePick.click()} />

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
      <Link to='/'>Already have an account !</Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpUserStart: userCredentials => dispatch(signUpUserStart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
