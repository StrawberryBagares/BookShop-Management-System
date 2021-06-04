import React from 'react';
import shortid from 'shortid';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminEmployee.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const AdminEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const addressHandler = (e) => {
    setAddress(e.target.value);
  };
  const numberHandler = (e) => {
    setNumber(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const employeeInfo = {
      id: shortid.generate(),
      firstName: firstName,
      lastName: lastName,
      address: address,
      number: number,
      email: email,
      password: password,
    };
    await axios
      .post('http://localhost:3001/auth/employee/register', employeeInfo)
      .then((result) => {
        // console.log(result.data);
        setFirstName('');
        setLastName('');
        setAddress('');
        setNumber('');
        setEmail('');
        setPassword('');
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
    <div className='form-login'>
      <h1>Add Employee</h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-add__control'>
          <label>First Name</label>
          <input type='text' onChange={firstNameHandler} value={firstName} />
        </div>
        <div className='form-add__control'>
          <label>Last Name</label>
          <input type='text' onChange={lastNameHandler} value={lastName} />
        </div>
        <div className='form-add__control'>
          <label>Address</label>
          <input type='text' onChange={addressHandler} value={address} />
        </div>
        <div className='form-add__control'>
          <label>Contact #</label>
          <input type='text' onChange={numberHandler} value={number} />
        </div>
        <div className='form-add__control'>
          <label>E-mail</label>
          <input type='email' onChange={emailHandler} value={email} />
        </div>
        <div className='form-add__control'>
          <label>Password</label>
          <input type='password' onChange={passwordHandler} value={password} />
        </div>
        <div className='form-add__action'>
          <button type='submit'>Add Employee</button>
          <Link to='/admin/dashboard'>Cancel</Link>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          Employee addedd successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminEmployee;
