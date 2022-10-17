import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Graph from '../components/Graph';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import validator from 'validator';

const data = JSON.parse(window.localStorage.getItem('data'));

const Dashboard = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  let validate = JSON.parse(window.localStorage.getItem('data'));
  
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  const handleCloseEdit = () => setEdit(false);
  const handleShowEdit = () => setEdit(true);

function handleSubmit(e) {

  e.preventDefault();
  if (name === '' || email === '' || password === '' ) {
    setMessage ('Please fill the required fields')
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

  else {

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
          window.location.reload(true);
          return;
          
        }

    }

    else {
      
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      else {
        for(let i=0; i < validate.length; i++){

          if (validate[i].email === email) {
             setMessage ('Email already exists')
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
        window.location.reload(true);
        return;
        
      }
      
    }

  }

}  

function handleEdit(e){

  e.preventDefault();

  if (name === '' || email === '' || password === '' ) {
    setMessage ('Please fill the required fields')
    return; 
    
  }

  if (password !== confirmPassword){
  setMessage('Passwords do not match');
  return;
  }

  validate = validate.map((item) => {

      if (item.email === email && item.password === password) {
        return {
          ...item,
          email: email,
          name: name,
          password: password,
        }    
      }
      return item;
  })
  localStorage.setItem('data', JSON.stringify(validate));
  window.location.reload(true);
}

function handleDelete(id) {

    const deleteUser = validate.filter((item) => {
      return item.id !== id;
    })

    localStorage.setItem('data', JSON.stringify(deleteUser));
    alert ('Delete User Successful')
    window.location.reload(true);
}

  if (window.localStorage.data === undefined) {
    return (
      <div>
        <Header />
        <Button class="mx-auto d-block" color="primary" onClick={handleShow}>
          Create New User
        </Button>
        <Table bordered borderless hover responsive className="table">
          <thead>
            <tr style={{ fontWeight: "bold", color: "blue" }}>
              <th>Email</th>
              <th>Name</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">N/A</th>
              <td>N/A</td>
              <td>N/A</td>
              <td>
                <Button color="success" onClick={handleShowEdit}>
                  Update User
                </Button>
                <Button color="danger" onClick={handleDelete}>
                  Delete User
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Graph />
        <Footer />

        <Modal isOpen={modal} onHide={handleClose}>
          <FormGroup>
            <ModalHeader>
              <div>
                <h3>Insert Register: </h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Name: </label>
                <input
                  className="form-control"
                  id="staticName"
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </FormGroup>
              <FormGroup>
                <label>Email: </label>
                <input
                  className="form-control"
                  id="staticEmail"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormGroup>
              <FormGroup>
                <label>Password: </label>
                <input
                  className="form-control"
                  id="static"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FormGroup>
              <FormGroup>
                <label>Confirm Password: </label>
                <input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={handleSubmit}>
                Insert
              </Button>
              <Button color="danger" onClick={handleClose}>
                Cancel
              </Button>
            </ModalFooter>
            <span
              class="container d-grid justify-content-center align-items-center h-100 mt-4"
              style={{ fontWeight: "bold", color: "red" }}
            >
              {message}
            </span>
          </FormGroup>
        </Modal>
        <Modal isOpen={edit} onHide={handleCloseEdit}>
          <FormGroup>
            <ModalHeader>
              <div>
                <h3>Edit User: </h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Name: </label>
                <input
                  className="form-control"
                  id="staticName"
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </FormGroup>
              <FormGroup>
                <label>Email: </label>
                <input
                  className="form-control"
                  id="staticEmail"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormGroup>
              <FormGroup>
                <label>Password: </label>
                <input
                  className="form-control"
                  id="static"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FormGroup>
              <FormGroup>
                <label>Confirm Password: </label>
                <input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button color="danger" onClick={handleCloseEdit}>
                Cancel
              </Button>
            </ModalFooter>
          </FormGroup>
        </Modal>
      </div>
    );
  }

  else {
    return (
      <div>
        <Header />
        <Button onClick={handleShow} color='primary'>Create New User</Button>
        <Table bordered borderless hover responsive>
          <thead>
            <tr style={{ fontWeight: "bold", color: "blue"}}>
              <th>Email</th>
              <th>Name</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => 
              <tr>
              <th scope='row'>{item.email}</th>
              <td>{item.name}</td>
              <td>{item.password}</td>
              <td>
                <Button color='success' onClick={handleShowEdit} >Update User</Button>{"  "}
                <Button color='danger' onClick={() => handleDelete(item.id)}>Delete User</Button>
              </td>
            </tr>
            )}
          </tbody>
        </Table>
        <Graph />
        <Footer />

        <Modal isOpen={modal} onHide={handleClose}>
          <FormGroup>
              <ModalHeader>
                <div>
                  <h3>Insert Register: </h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label>Name: </label>
                  <input className='form-control' id='staticName' name='name' type='text' onChange={(e) => setName(e.target.value)} value={name} />
                </FormGroup>
                <FormGroup>
                  <label>Email:  </label>
                  <input className='form-control' id='staticEmail' name='email' type='email' onChange={(e) => setEmail(e.target.value)} value={email}  />
                </FormGroup>
                <FormGroup>
                  <label>Password: </label>
                  <input className='form-control' id='static' name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password}   />
                </FormGroup>
                <FormGroup>
                  <label>Confirm Password: </label>
                  <input className='form-control' name='confirmPassword' type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button color='primary' onClick={handleSubmit}  >Insert</Button>
                <Button color='danger' onClick={handleClose} >Cancel</Button>
              </ModalFooter>
              <span  class="container d-grid justify-content-center align-items-center h-100 mt-4" style={{ fontWeight: "bold",color: "red"}}>
                    {message}
              </span>
          </FormGroup>
        </Modal>
        <Modal isOpen={edit} onHide={handleCloseEdit}>
          <FormGroup>
              <ModalHeader>
                <div>
                  <h3>Edit User: </h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <label>Name: </label>
                  <input className='form-control' id='staticName' name='name' type='text' onChange={(e) => setName(e.target.value)} value={name} />
                </FormGroup>
                <FormGroup>
                  <label>Email:  </label>
                  <input className='form-control' id='staticEmail' name='email' type='email' onChange={(e) => setEmail(e.target.value)} value={email}  />
                </FormGroup>
                <FormGroup>
                  <label>Password: </label>
                  <input className='form-control' id='static' name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password}   />
                </FormGroup>
                <FormGroup>
                  <label>Confirm Password: </label>
                  <input className='form-control' name='confirmPassword' type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button color='primary' onClick={handleEdit} >Edit</Button>
                <Button color='danger' onClick={handleCloseEdit}>Cancel</Button>
              </ModalFooter>
          </FormGroup>
        </Modal>
      </div>
    )
  }
}

export default Dashboard

