import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

const LoginPage = () => {
  const { register, errors, handleSubmit } = useForm();
  const [errorFormSubmit, setErrorFormSubmit] = useState('');
  const [loading, setLoading] = useState(false);
  const { email, password } = errors;

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
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
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input name='email' type='email' ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
        {email && <p>This field is required</p>}

        <label>Password</label>
        <input name='password' type='password' ref={register({ required: true, minLength: 6 })} />
        {password && password.type === 'required' && <p>This field is required</p>}
        {password && password.type === 'minLength' && <p>Password must have at least 6 characters</p>}

        {errorFormSubmit && <p>{errorFormSubmit}</p>}

        <input type='submit' disabled={loading} />
        <Link style={{ color: 'gray', textDecoration: 'none' }} to='/register'>
          아직 아이디가 없다면...
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
