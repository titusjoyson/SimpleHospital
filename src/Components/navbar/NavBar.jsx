import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { MdLogout, MdSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  return (
    <>
      <Navbar
        data-bs-theme="dark"
        expand="lg"
        sticky="top"
        className="custom-navbar-bg"
      >
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
                className="custom-dropdown-menu hide-dropdown-caret"
              >
                <NavDropdown.Item href="#action/3.1">
                  <FaUser /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <MdSettings /> Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <MdLogout /> Log Out
                </NavDropdown.Item>
              </NavDropdown>
              <img
                src="/profile-photo.png"
                alt="Profile photo"
                className="rounded-circle"
                style={{
                  verticalAlign: "middle",
                  width: "45px",
                  height: "45px",
                }}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
