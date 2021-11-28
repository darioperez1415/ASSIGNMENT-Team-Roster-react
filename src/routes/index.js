import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Team from '../views/Team';
import New from '../views/New';
import Home from '../views/Home';

export default function Routes({
  player,
  players,
  setPlayers,
  setEditPlayers,
  user,
}) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Team
              players={players}
              setPlayers={setPlayers}
              setEditPlayers={setEditPlayers}
              user={user}
            />
          )}
        />
        <Route
          exact
          path="/New"
          component={() => (
            <New
              players={players}
              player={player}
              setPlayers={setPlayers}
              setEditPlayers={setEditPlayers}
              user={user}
            />
          )}
        />
        <Route
          exact
          path="/Home"
          component={() => (
            <Home />
          )}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    number: PropTypes.number,
    imageURL: PropTypes.string,
    uid: PropTypes.string,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

Routes.defaultProps = { player: {} };
