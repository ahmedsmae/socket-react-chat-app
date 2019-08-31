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

  const [photo, setPhoto] = useState({
    photoFileName: '',
    photoObject: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = userCredentials;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const { photoFileName, photoObject } = photo;

    if (!photoFileName.length || !photoObject) {
      alert('Please add photo');
      return;
    }

    signUpUserStart({ name, email, password, photo });

    setCredentials({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const setImagePreview = files => {
    // this func is to set the selected photo on the <UserImage /> for preview after user select

    if (files && files[0]) {
      const file = files[0];

      const reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          // set the result on the state to rerender the component
          setPhotoPreview(e.target.result);
        };
      })(file);

      reader.readAsDataURL(file);
    }
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
        onChange={({ target: { files } }) => {
          setPhoto({
            ...photo,
            photoObject: files[0],
            photoFileName: files[0].name
          });
          setImagePreview(files);
        }}
        ref={fileInput => (filePick = fileInput)}
      />

      <UserImage src={photoPreview} onClick={() => filePick.click()} />

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
      <Link to='/' className='sign-in'>
        Already have an account !
      </Link>
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
