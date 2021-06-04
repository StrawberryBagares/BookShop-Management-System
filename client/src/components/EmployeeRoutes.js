import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const EmployeeRoutes = () => {
  const history = useHistory();

  const logoutHandler = async () => {
    await axios
      .get('http://localhost:3001/auth/employee/logout')
      .then((result) => {
        console.log(result.data.loggedIn);
        if (result.data.loggedIn === false) {
          history.push('/');
        }
      });
  };

  return (
    <div className='home-container'>
      <h1>Employee Section</h1>
      <Link to='/employee/book/create' className='home-container__link'>
        Add Books
      </Link>
      <Link to='/employee/book/view' className='home-container__link'>
        View Books
      </Link>
      <Link to='/employee/book/delete' className='home-container__link'>
        Delete Books
      </Link>
      <button onClick={logoutHandler} className='btn-logout'>
        Log-out
      </button>
    </div>
  );
};

export default EmployeeRoutes;
