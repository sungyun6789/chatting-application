import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import md5 from 'md5';

const RegisterPage = () => {
  const { register, watch, errors, handleSubmit } = useForm();
  const [errorFormSubmit, setErrorFormSubmit] = useState('');
  const [loading, setLoading] = useState(false);
  const { email, name, password, password_confirm } = errors;

  const passwordRef = useRef();
  passwordRef.current = watch('password');

  const onSubmit = async ({ email, password, name }) => {
    setLoading(true);
    try {
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password);

      await createdUser.user.updateProfile({
        displayName: name,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
      });

      // 파이어베이스 데이터베이스에 저장
      await firebase.database().ref('users').child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });
    } catch (error) {
      console.log(error);
      setErrorFormSubmit(error.message);
      setTimeout(() => {
        setErrorFormSubmit('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-wrapper'>
      <div style={{ textAlign: 'center' }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input name='email' type='email' ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
        {email && <p>This field is required</p>}

        <label>Name</label>
        <input name='name' ref={register({ required: true, maxLength: 10 })} />
        {name && name.type === 'required' && <p>This field is required</p>}
        {name && name.type === 'maxLength' && <p>Your input exceed maximum length</p>}

        <label>Password</label>
        <input name='password' type='password' ref={register({ required: true, minLength: 6 })} />
        {password && password.type === 'required' && <p>This field is required</p>}
        {password && password.type === 'minLength' && <p>Password must have at least 6 characters</p>}

        <label>Password Confirm</label>
        <input
          name='password_confirm'
          type='password'
          ref={register({ required: true, validate: (value) => value === passwordRef.current })}
        />
        {password_confirm && password_confirm.type === 'required' && <p>This password confirm field is required</p>}
        {password_confirm && password_confirm.type === 'validate' && <p>The passwords do not match</p>}

        {errorFormSubmit && <p>{errorFormSubmit}</p>}

        <input type='submit' disabled={loading} />
        <Link style={{ color: 'gray', textDecoration: 'none' }} to='/login'>
          이미 아이디가 있다면...
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
