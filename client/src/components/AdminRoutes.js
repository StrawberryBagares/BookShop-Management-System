import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminRoutes = () => {
  const history = useHistory();

  const logoutHandler = async () => {
    await axios
      .get('http://localhost:3001/auth/admin/logout')
      .then((result) => {
        console.log(result.data.loggedIn);
        if (result.data.loggedIn === false) {
          history.push('/');
        }
      });
  };

  return (
    <div className='home-container'>
      <h1>Admin Section</h1>
      <Link to='/admin/create' className='home-container__link'>
        Add Employee
      </Link>
      <Link to='/admin/view' className='home-container__link'>
        View Employee
      </Link>
      <Link to='/admin/delete' className='home-container__link'>
        Delete Employee
      </Link>
      <button onClick={logoutHandler} className='btn-logout'>
        Log-out
      </button>
    </div>
  );
};

export default AdminRoutes;
