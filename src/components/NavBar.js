import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import $ from "jquery";




const NavigationBar = ({darkMode,changeTheme}) => {    
    let Token=localStorage.getItem('Token')
    const [token,setToken]=useState(Token)
    let navigate = useNavigate();
    useEffect(() => {
        if (!token){
        $('.navigation').addClass('d-none')
         navigate("/login")         
        }
    },[token])

    const Logout= ()=>{          
        $('.navigation').addClass('d-none')
        localStorage.removeItem('Token')
        navigate("/login")    
    }
    const changeState = (darkMode) =>{
        changeTheme(!darkMode)        
      }
  return (    
    <div className={`navigation `}>
        <Navbar className={darkMode ? 'navbar-dark' : ''} style={{fontSize: '0.7rem'}}>
      <Container>
        <Navbar.Brand><img src="https://img.icons8.com/windows/32/12B886/django.png"/> + <img src="https://img.icons8.com/color/32/000000/react-native.png"/> Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => Logout()}>Logout</Nav.Link>
            <NavDropdown title="Github" id="basic-nav-dropdown" >
              <NavDropdown.Item href="https://github.com/Manav1011/notes_backend">Backend</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/Manav1011/notes-frontend">Frontend</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => { changeState(darkMode) }}>{darkMode ? `Theme: Dark` : `Theme: Light`}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavigationBar