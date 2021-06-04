import React from 'react';
import AdminRoutes from '../components/AdminRoutes';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

const AdminSection = () => {
  const history = useHistory();

  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get('http://localhost:3001/auth/admin/login')
        .then((result) => {
          if (result.data.loggedIn === true && result.data.role === 'admin') {
            console.log('welcome admin');
          } else {
            if (result.data.error === 'not employee') {
              history.push('/admin/login');
            } else {
              history.push('/admin/login');
            }
          }
        });
    };
    checkAuth();
  }, []);

  return <AdminRoutes />;
};

export default AdminSection;
