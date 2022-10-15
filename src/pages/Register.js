import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Footer from '../components/Footer';
import validator from 'validator';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const validate = JSON.parse(window.localStorage.getItem('data'));

  function handleSubmit(e){

    e.preventDefault();

    if (name === '' || email === '' || password === '' ) {
      setMessage ('Please fill the required fields (Name, Email and Password)')
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

    if (localStorage.data === undefined) {

      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      else {

        let userObj = {
          id: uuid(),
          email: email,
          password: password,
          name: name,
        };
  
        let userArray = [];
  
        if(!localStorage.getItem('data')) {
          userArray.push(userObj);
          localStorage.setItem('data', JSON.stringify(userArray));
       } else {
          userArray = JSON.parse(localStorage.getItem('data'));
          userArray.push(userObj);
          localStorage.setItem('data', JSON.stringify(userArray));
       }
  
        alert('Register Successful');
        window.location = '/login';
      }
      
    }

    else {

        if (password !== confirmPassword) {
          setMessage('Passwords do not match');
            return;
        }

        else {
          for(let i=0; i< validate.length; i++){

            if (validate[i].email === email) {
              setMessage('Email already exists');
              return;
            }
          }

              let userObj = {
                id: uuid(),
                email: email,
                password: password,
                name: name,
              };
        
              let userArray = [];
        
              if(!localStorage.getItem('data')) {
                userArray.push(userObj);
                localStorage.setItem('data', JSON.stringify(userArray));
             } else {
                userArray = JSON.parse(localStorage.getItem('data'));
                userArray.push(userObj);
                localStorage.setItem('data', JSON.stringify(userArray));
             }
        
              alert('Register Successful');
              window.location = '/login';

        }
        
 
            
      }
  }


  return (
    <div class="container d-grid justify-content-center align-items-center h-100" >
      <Link to='/'>
        <img src={Logo} alt='Logo' class="rounded mx-auto d-block" style={{height: '150px'}}/>
      </Link>
      <h1 class='mx-auto mt-4'>Create an account</h1>
      <form className='form-principal' onSubmit={handleSubmit} >
        <div>
          <label for="staticEmail" class="col-sm-5 col-form-label">Email: </label>
          <input
            type="text"
            readonly
            class="form-input"
            id="staticEmail"
            placeholder="email@example.com"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label for="staticName" class="col-sm-5 col-form-label">Name: </label>
          <input
            type="text"
            readonly
            class="form-input"
            id="staticName"
            placeholder='Insert Name'
            onChange={(e)=> setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label class="col-sm-5 col-form-label">Password: </label>
          <input
            type="password"
            readonly
            class="form-input"
            id="static"
            placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label class="col-sm-5 col-form-label">Confirm Password: </label>
          <input
            type="password"
            readonly
            class="form-input"
            id="staticPassword"
            placeholder="Confirm Password"
            onChange={(e)=> setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
       <br></br>
        <div class='mx-auto'>
            <button type="submit" class="btn btn-success btn-lg" >Register User</button>
            <Link to='/'>
              <button type="submit" class="btn btn-info btn-lg">Go to home</button>
            </Link>
        </div>
        <span class='mx-auto mt-5' style={{
          fontWeight: "bold",
          color: "red"
        }}>
          {message}
        </span>
      </form>
      <Footer />
    </div>

  );
}

export default Register