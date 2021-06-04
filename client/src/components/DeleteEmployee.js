import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import './DeleteEmployee.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const DeleteEmployee = () => {
  const history = useHistory();
  const [employeeID, setEmployeeID] = useState('');
  const [open, setOpen] = React.useState(false);

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

  const employeeIDHandler = (e) => {
    setEmployeeID(e.target.value);
  };

  const onDeleteEmployee = async () => {
    await axios
      .delete(`http://localhost:3001/auth/employee/delete/${employeeID}`)
      .then((result) => {
        // console.log('done');
        setEmployeeID('');
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className='delete-employee'>
      <h1>Delete Employee</h1>
      <div className='form-delete__control'>
        <label>Enter Employee ID</label>
        <input type='text' onChange={employeeIDHandler} value={employeeID} />
      </div>
      <div className='form-add__action'>
        <button onClick={onDeleteEmployee}>Delete</button>
        <Link to='/admin/dashboard'>Cancel</Link>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          Employee record deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeleteEmployee;
