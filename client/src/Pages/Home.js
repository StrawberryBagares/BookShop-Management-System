import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Bookshop Management</h1>
      <Link to='/admin/login' className='home-container__link'>
        Admin Login
      </Link>
      <Link to='/employee/login' className='home-container__link'>
        Employee Login
      </Link>
    </div>
  );
};

export default Home;
