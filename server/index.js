const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = 3001;
const saltRounds = 10;

const app = express();

app.use(express());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    key: 'userSession',
    secret: 'bookmanagementsecret0147',
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 60 * 60 * 24 },
  })
);

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Smb0742+',
  database: 'bookManagementDB',
});

app.post('/auth/admin/login', (req, res) => {
  const { email, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    pool.query(
      'SELECT * FROM tblAdmin WHERE email = ?',
      [email],
      (err, result) => {
        if (err) console.log(err);

        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = result;
              res.send({ message: 'Logged In' });
            } else {
              res.send({
                message: 'Wrong username/password combination',
              });
            }
          });
        } else {
          res.send({ message: 'No user found' });
        }
      }
    );
  });
});

app.get('/auth/admin/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, role: 'admin' });
  } else {
    res.send({ loggedIn: false });
  }
  // if (req.session.user) {
  //   if ('adminID' in req.session.user[0]) {
  //     res.send({ loggedIn: true, role: 'admin' });
  //   } else {
  //     res.send({ error: 'not admin' });
  //   }
  // } else {
  //   res.send({ loggedIn: false });
  // }
});

app.get('/auth/admin/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie('userSession');
    res.send({ loggedIn: false });
  }
});

app.post('/auth/employee/register', (req, res) => {
  const { id, firstName, lastName, address, number, email, password } =
    req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      pool.query(
        'INSERT INTO tblEmployee (empID, email, password, first_name, last_name, address, number) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, email, hash, firstName, lastName, address, number],
        (err, result) => {
          connection.release();

          if (!err) {
            res.status(201).send({ message: 'Employee Account Added 🔥' });
          } else {
            console.log(err);
          }
        }
      );
    });
  });
});

app.delete('/auth/employee/delete/:empID', (req, res) => {
  const { empID } = req.params;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    pool.query(
      'DELETE FROM tblEmployee WHERE empID = ?',
      [empID],
      (err, result) => {
        if (!err) {
          res.status(200).send({ message: 'Deleted Employee' });
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.get('/auth/employee/list', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    pool.query('SELECT * FROM tblEmployee', (err, result) => {
      connection.release();

      if (!err) {
        res.status(200).json(result);
      } else {
        console.log(err);
      }
    });
  });
});

// TODO: Book Create

app.post('/book/create', (req, res) => {
  const { bookid, title, author, publisher, quantity } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    pool.query(
      'INSERT INTO tblBooks (bookID, title, author, publisher, quantity) VALUES (?, ?, ?, ?, ?)',
      [bookid, title, author, publisher, quantity],
      (err, result) => {
        connection.release();

        if (!err) {
          res.send({ message: 'Book Added 🔥' });
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.get('/auth/book/list', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    pool.query('SELECT * FROM tblBooks', (err, result) => {
      connection.release();

      if (!err) {
        res.status(200).json(result);
      } else {
        console.log(err);
      }
    });
  });
});

app.delete('/auth/book/delete/:empID', (req, res) => {
  const { empID } = req.params;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    pool.query(
      'DELETE FROM tblBooks WHERE bookID = ?',
      [empID],
      (err, result) => {
        if (!err) {
          res.status(200).send({ message: 'Deleted Book' });
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.post('/auth/employee/login', (req, res) => {
  const { email, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    pool.query(
      'SELECT * FROM tblEmployee WHERE email = ?',
      [email],
      (err, result) => {
        if (err) console.log(err);

        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = result;
              res.send({ message: 'Logged In' });
            } else {
              res.send({
                message: 'Wrong username/password combination',
              });
            }
          });
        } else {
          res.send({ message: 'No user found' });
        }
      }
    );
  });
});

app.get('/auth/employee/login', (req, res) => {
  if (req.session.user) {
    if ('empID' in req.session.user[0]) {
      res.send({ loggedIn: true, role: 'employee' });
    } else {
      res.send({ error: 'not employee' });
    }
  } else {
    res.send({ loggedIn: false });
  }
});

app.get('/auth/employee/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie('userSession');
    res.send({ loggedIn: false });
  }
});

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
