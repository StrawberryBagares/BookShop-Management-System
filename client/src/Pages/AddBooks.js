import React from 'react';
import EmployeeBooks from '../components/EmployeeBooks';
import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddBooks = () => {
  const history = useHistory();

  useEffect(() => {
    const checkAuth = () => {
      axios.get('http://localhost:3001/auth/employee/login').then((result) => {
        if (result.data.loggedIn === true && result.data.role === 'employee') {
          console.log('Welcome Admin');
        } else {
          history.push('/employee/login');
        }
      });
    };
    checkAuth();
  }, []);
  return <EmployeeBooks />;
};

export default AddBooks;
