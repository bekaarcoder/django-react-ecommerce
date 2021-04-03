import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand href="#home">Django Ecommerce</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <Nav.Link href="#">All Categories</Nav.Link>
      </Nav>
      <Nav>
        <LinkContainer to="/cart">
          <Nav.Link href="#pricing">
            <i className="fas fa-shopping-cart"></i> Cart
          </Nav.Link>
        </LinkContainer>
        {userInfo ? (
          <NavDropdown title={userInfo.name} id="username" alignRight>
            <LinkContainer to="/profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <LinkContainer to="/login">
            <Nav.Link href="#features">
              <i className="fas fa-user"></i> Login
            </Nav.Link>
          </LinkContainer>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
