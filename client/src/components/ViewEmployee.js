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
import './ViewEmployee.css';

const ViewEmployee = () => {
  const [employeeList, setEmployeesList] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get('http://localhost:3001/auth/employee/list')
        .then((result) => {
          setEmployeesList(result.data);
        });
    };

    getUserData();
  }, []);

  return (
    <div className='view-employee'>
      <h1>Employees</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((val, key) => (
              <TableRow key={key}>
                <TableCell>{val.empID}</TableCell>
                <TableCell>{val.first_name}</TableCell>
                <TableCell>{val.last_name}</TableCell>
                <TableCell>{val.address}</TableCell>
                <TableCell>{val.number}</TableCell>
                <TableCell>{val.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to='/admin/dashboard' className='btn-back'>
        Back
      </Link>
    </div>
  );
};

export default ViewEmployee;
