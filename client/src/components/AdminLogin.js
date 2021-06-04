import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  axios.defaults.withCredentials = true;

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const adminInfo = {
      email: email,
      password: password,
    };
    await axios
      .post('http://localhost:3001/auth/admin/login', adminInfo)
      .then((result) => {
        if (result.data.message !== 'Logged In') {
          setError(result.data.message);
        } else {
          history.push('/admin/dashboard');
        }
      });
  };

  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get('http://localhost:3001/auth/admin/login')
        .then((result) => {
          if (result.data.loggedIn === true && result.data.role === 'admin') {
            console.log('welcome admin');
          } else {
            history.push('/admin/login');
          }
        });
    };
    checkAuth();
  }, []);
  return (
    <div className='form-login'>
      <h1>Admin Log-in</h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-login__control'>
          <label>Email</label>
          <input type='email' onChange={emailHandler} />
        </div>
        <div className='form-login__control'>
          <label>Password</label>
          <input type='password' onChange={passwordHandler} />
        </div>
        <div className='form-login__action'>
          <button type='submit'>Login</button>
        </div>
        <span>{error}</span>
      </form>
    </div>
  );
};

export default AdminLogin;
