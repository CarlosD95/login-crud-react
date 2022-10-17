import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const Header = () => {
  return (
    <Link to='/'>
        <img src={Logo} alt='Logo' class="rounded mx-auto d-block mt-4" style={{height: '150px'}}/>
    </Link>
  )
}

export default Header