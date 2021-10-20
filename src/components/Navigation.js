import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
}
  from 'reactstrap';
import { signOutUser } from '../api/auth';
// import PropTypes from 'prop-types';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  // const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Team Roster</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/team/">Team</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="new">New</NavLink>
            </NavItem>
            <div className="text-center mb-3">
              <ButtonGroup size="lg">
                {/* <button
                  onClick={() => history.push('/')}
                  type="button"
                  className="btn btn-light border border-dark"
                /> */}
                <button
                  onClick={signOutUser}
                  type="button"
                  className="btn btn-danger"
                >
                  Log Out
                </button>
              </ButtonGroup>
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
