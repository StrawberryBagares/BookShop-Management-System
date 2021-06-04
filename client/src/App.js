import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Employee from './Pages/Employee';
import AdminSection from './Pages/AdminSection';
import AddEmployee from './Pages/AddEmployee';
import EmployeeList from './Pages/EmployeeList';
import DeleteEmployee from './components/DeleteEmployee';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import AddBooks from './Pages/AddBooks';
import BookList from './Pages/BookList';
import DeleteBook from './Pages/DeleteBook';

function App() {
  return (
    <Router>
      <div className='header'>
        <Link to='/'>Home</Link>
      </div>
      <main>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/admin/login'>
            <Admin />
          </Route>
          <Route path='/employee/login'>
            <Employee />
          </Route>
          <Route path='/admin/dashboard'>
            <AdminSection />
          </Route>
          <Route path='/admin/create'>
            <AddEmployee />
          </Route>
          <Route path='/admin/view'>
            <EmployeeList />
          </Route>
          <Route path='/admin/delete'>
            <DeleteEmployee />
          </Route>
          <Route path='/employee/dashboard'>
            <EmployeeDashboard />
          </Route>
          <Route path='/employee/book/create'>
            <AddBooks />
          </Route>
          <Route path='/employee/book/view'>
            <BookList />
          </Route>
          <Route path='/employee/book/delete'>
            <DeleteBook />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
