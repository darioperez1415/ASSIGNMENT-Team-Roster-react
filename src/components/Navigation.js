import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  ButtonGroup,
}
  from 'reactstrap';
import { signOutUser } from '../api/auth';

export default function Navigation() {
  const history = useHistory();

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Nav className="mr-auto" navbar>
          <NavLink
            exact
            activeClassName="navbar__link--active"
            onClick={() => history.push('/new')}
          >New
          </NavLink>
          <NavLink
            exact
            activeClassName="navbar__link--active"
            onClick={() => history.push('/team')}
          >Team
          </NavLink>
          <NavLink
            exact
            activeClassName="navbar__link--active"
            onClick={() => history.push('/home')}
          >Home
          </NavLink>
          <div className="text-center mb-3">
            <ButtonGroup size="lg">
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
      </Navbar>
    </div>
  );
}
