import React from 'react';
import { useHistory } from 'react-router';
import { ButtonGroup } from 'reactstrap';
import { signOutUser } from '../api/auth';

export default function Navigation() {
    const history = useHistory()

  return(
    <div className="text-center mb-3">
    <ButtonGroup size="lg">
      <button
        onClick={() => history.push('/')}
        type="button"
        className="btn btn-light border border-dark"
      >
        Home
      </button>
      <button
        onClick={signOutUser}
        type="button"
        className="btn btn-light border border-dark"
      >
        Log Out
      </button>
    </ButtonGroup>
  </div>
);
}