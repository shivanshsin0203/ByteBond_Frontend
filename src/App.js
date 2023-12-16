import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home.js';
import Login from './login.js';
import User from './user.js';
import Signin from './signin.js';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/login/:mode" element={<Login />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/signin/:mode" element={<Signin />} />
      </Routes>
    </Router>
  );
};

export default App;
