import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const NavBar = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/" className="custom-navbar-brand">
            Lysander Hospital
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" bg="light">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown
                title="Velmurugan"
                id="collapsible-nav-dropdown"
                className="custom-dropdown-menu"
              >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
