import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const EmployeeBooks = () => {
  const [bookID, setBookID] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [quantity, setQuantity] = useState('');
  const [open, setOpen] = React.useState(false);

  const bookIDHandler = (e) => {
    setBookID(e.target.value);
  };
  const bookTitleHandler = (e) => {
    setBookTitle(e.target.value);
  };
  const authorHandler = (e) => {
    setAuthor(e.target.value);
  };
  const publisherHandler = (e) => {
    setPublisher(e.target.value);
  };
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const bookInfo = {
      bookid: bookID,
      title: bookTitle,
      author: author,
      publisher: publisher,
      quantity: quantity,
    };
    await axios
      .post('http://localhost:3001/book/create', bookInfo)
      .then((result) => {
        // console.log(result.data);
        setBookID('');
        setBookTitle('');
        setAuthor('');
        setPublisher('');
        setQuantity('');
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
      <h1>Add Books</h1>
      <form onSubmit={onSubmitHandler}>
        <div className='form-add__control'>
          <label>Book ID</label>
          <input type='number' onChange={bookIDHandler} value={bookID} />
        </div>
        <div className='form-add__control'>
          <label>Book Title</label>
          <input type='text' onChange={bookTitleHandler} value={bookTitle} />
        </div>
        <div className='form-add__control'>
          <label>Author</label>
          <input type='text' onChange={authorHandler} value={author} />
        </div>
        <div className='form-add__control'>
          <label>Publisher</label>
          <input type='text' onChange={publisherHandler} value={publisher} />
        </div>
        <div className='form-add__control'>
          <label>Quantity</label>
          <input type='number' onChange={quantityHandler} value={quantity} />
        </div>
        <div className='form-add__action'>
          <button type='submit'>Add Book</button>
          <Link to='/employee/dashboard'>Cancel</Link>
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          Book added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EmployeeBooks;
