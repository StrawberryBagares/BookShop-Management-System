import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBooks = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      await axios.get('http://localhost:3001/auth/book/list').then((result) => {
        setBookList(result.data);
      });
    };

    getUserData();
  }, []);

  return (
    <div className='view-employee'>
      <h1>Books</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book ID</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((val, key) => (
              <TableRow key={key}>
                <TableCell>{val.bookID}</TableCell>
                <TableCell>{val.title}</TableCell>
                <TableCell>{val.author}</TableCell>
                <TableCell>{val.publisher}</TableCell>
                <TableCell>{val.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to='/employee/dashboard' className='btn-back'>
        Back
      </Link>
    </div>
  );
};

export default ViewBooks;
