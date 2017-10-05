import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

class Header extends Component {
  render() {
    return (
      <header className="container-fluid d-flex justify-content-between">
        <NavLink to="/"><h4>Code Snippets</h4></NavLink>
        <Navbar />
      </header>
    );
  }
}

export default Header;
