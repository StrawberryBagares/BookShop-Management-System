import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import EmployeeRoutes from '../components/EmployeeRoutes';

const EmployeeDashboard = () => {
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:3001/auth/employee/login').then((result) => {
      if (result.data.loggedIn === true && result.data.role === 'employee') {
        console.log('welcome admin');
      } else {
        if (result.data.error === 'not employee') {
          history.push('/employee/login');
        } else {
          history.push('/employee/login');
        }
      }
    });
  }, []);
  return <EmployeeRoutes />;
};

export default EmployeeDashboard;
