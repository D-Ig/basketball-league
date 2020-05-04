import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NavBar: FC = () => (
  <div className='container navbar'>
    <Link to='/'>HOME</Link>
    <nav className='nav-links'>
      <Link to='/players'>PLAYERS</Link>
      <Link to='/teams'>TEAMS</Link>
    </nav>
  </div>
);

export default NavBar;
