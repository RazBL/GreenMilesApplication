import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Admin from './components/Admin';
import UsersList from './components/UsersList';
import Hotels from './/components/Hotels';
import Flights from './/components/Flights';
import AdminContextProvidewr from './contexts/AdminContext';

function App() {

  return (
    <AdminContextProvidewr>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/hotels" element={<Hotels />} />
          <Route path="/admin/flights" element={<Flights />} />
          <Route path="/admin/users" element={<UsersList />} />
        </Routes>
      </Router>
    </AdminContextProvidewr>
  );
}

export default App;