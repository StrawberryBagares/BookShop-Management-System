import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const EmployeeLogin = () => {
  const history = useHistory();

  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLoginHandler = async (e) => {
    const employeeData = {
      email: email,
      password: password,
    };
    e.preventDefault();
    await axios
      .post('http://localhost:3001/auth/employee/login', employeeData)
      .then((result) => {
        if (result.data.message !== 'Logged In') {
          setError(result.data.message);
        } else {
          history.push('/employee/dashboard');
        }
      });
  };

  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get('http://localhost:3001/auth/employee/login')
        .then((result) => {
          if (
            result.data.loggedIn === true &&
            result.data.role === 'employee'
          ) {
            history.push('/employee/dashboard');
          } else {
            history.push('/employee/login');
          }
        });
    };

    checkAuth();
  }, []);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='form-login'>
      <h1>Employee Log-in</h1>
      <form onSubmit={onLoginHandler}>
        <div className='form-login__control'>
          <label>Email</label>
          <input type='text' onChange={emailHandler} />
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

export default EmployeeLogin;
