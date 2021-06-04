import React from 'react';
import RemoveBooks from '../components/RemoveBooks';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const DeleteBook = () => {
  const history = useHistory();
  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get('http://localhost:3001/auth/employee/login')
        .then((result) => {
          if (
            result.data.loggedIn === true &&
            result.data.role === 'employee'
          ) {
            console.log('Welcome Admin');
          } else {
            history.push('/employee/login');
          }
        });
    };

    checkAuth();
  }, []);
  return <RemoveBooks />;
};

export default DeleteBook;
