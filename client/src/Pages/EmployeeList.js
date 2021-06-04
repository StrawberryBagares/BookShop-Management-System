import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import ViewEmployee from '../components/ViewEmployee';

const EmployeeList = () => {
  const history = useHistory();

  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get('http://localhost:3001/auth/admin/login')
        .then((result) => {
          if (result.data.loggedIn === true && result.data.role === 'admin') {
            console.log('Welcome Admin');
          } else {
            history.push('/admin/login');
          }
        });
    };

    checkAuth();
  }, []);

  return <ViewEmployee />;
};

export default EmployeeList;
