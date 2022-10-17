import React, { useState } from 'react'
import Footer from '../components/Footer'
import validator from 'validator';
import Header from '../components/Header';
import { Link } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  let validate = JSON.parse(localStorage.getItem('data'));

  function handleSubmit (e) {
 
    e.preventDefault();
    if (email === '' || password === '') {
      setMessage ('Please fill the required fields (Email and Password)')
      return; 
      
    }

    if (!validator.isEmail(email)) {
      setMessage("Please, enter valid Email!");
      return;
    }

    if (!validator.isNumeric(password)) {
      setMessage("Please, put only numbers, no characters in the password!");
      return;
    }

    for(let i=0; i < validate.length; i++){

       if ((validate[i].email === email) && (validate[i].password === password)) {
          alert ('Login Successful')
          window.location = '/administrador'
          return;
        }
      } 
    setMessage ('Invalid Credentials, If you dont have an account, register')
    return; 
  }


  return (
    <div class="container d-grid justify-content-center align-items-center h-100" >
      <Header />
      <h1 class='mx-auto mt-4'>Please Log In</h1>
      <form className='form-principal' onSubmit={handleSubmit}>
        <div>
          <label for="staticEmail" class="col-sm-4 col-form-label">Email: </label>
          <input
            type="email"
            readonly
            class="form-input"
            name='email'
            id='staticEmail'
            placeholder="email@rapidchanges.com"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
          />
          
        </div>
        <div>
          <label class="col-sm-4 col-form-label">Password: </label>
          <input
            type="password"
            readonly
            class="form-input"
            name='password'
            id='static'
            placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
          />
         
        </div>
        <br></br>
        <div>
            <button type="submit" class="btn btn-primary btn-lg">Login</button>{" "}
            <Link to='/register'>
              <button type="button" class="btn btn-success btn-lg">Register</button>
            </Link>
        </div>
        <span class='mx-auto mt-5' style={{
          fontWeight: "bold",
          color: "blue"
        }}>
          {message}
        </span>
      </form>
      <Footer />
    </div>
  );
}

export default Login