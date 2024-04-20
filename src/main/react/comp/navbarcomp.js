import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from 'react-router-dom';


function NavScrollExample() {
  const nav = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Kavya Nasa's APOD</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={(e) => {e.preventDefault;nav('/home')}}>Home</Nav.Link>
            <Nav.Link onClick={(e) => {e.preventDefault;nav('/fetch')}}>Form</Nav.Link>
            <Nav.Link href="https://github.com/Srikavya080496/WebEngineering">SpringbootRea Code</Nav.Link>
            <Nav.Link href="https://api.nasa.gov/">NASA Open APIs</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;