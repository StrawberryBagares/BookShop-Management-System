import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import AdminEmployee from '../components/AdminEmployee';

const AddEmployee = () => {
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:3001/auth/admin/login').then((result) => {
      if (result.data.loggedIn === true && result.data.role === 'admin') {
        console.log('Welcome Admin');
      } else {
        history.push('/admin/login');
      }
    });
  }, []);

  return <AdminEmployee />;
};

export default AddEmployee;
