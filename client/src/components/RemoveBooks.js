import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const RemoveBooks = () => {
  const [bookID, setBookID] = useState('');
  const [open, setOpen] = React.useState(false);

  const bookIDHandler = (e) => {
    setBookID(e.target.value);
  };

  const onDeleteBook = async () => {
    await axios
      .delete(`http://localhost:3001/auth/book/delete/${bookID}`)
      .then((result) => {
        // console.log('done');
        setBookID('');
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
      <h1>Delete Book</h1>
      <div className='form-delete__control'>
        <label>Enter Book ID</label>
        <input type='text' onChange={bookIDHandler} value={bookID} />
      </div>
      <div className='form-add__action'>
        <button onClick={onDeleteBook}>Delete</button>
        <Link to='/employee/dashboard'>Cancel</Link>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          Book record deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RemoveBooks;
