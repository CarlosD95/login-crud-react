import './App.css';
import React from'react';
import Logo from './assets/Logo.png';
import { Outlet, Link } from 'react-router-dom';
import Footer from './components/Footer';


export default function App() {

  return (
      <div class="row d-grid justify-content-center align-items-center h-100">
        <Link to='/'>
        <img src={Logo} alt='Logo' class="rounded mx-auto d-block mt-2 mb-5 p-3" style={{height: '200px'}}/>
      </Link>
        <nav className='routes-principal'>
          <ul className='list-principal'>
            <li class='p-2'>
              <i class="bi bi-link mx-3"></i>
              <Link class='text-decoration-none ' to='/Login'>Login</Link>
            </li>
            <li class='p-2'>
              <i class="bi bi-upload mx-3"></i>
              <Link class='text-decoration-none' to='/register'>Register</Link>
            </li>
            <li class='p-2'>
              <i class="bi bi-unlock-fill mx-3"></i>
              <Link class='text-decoration-none' to='/administrador'>Administrador</Link>
            </li>
          </ul>
        </nav>
        <Footer />
        <Outlet />
      </div>
  );
}

