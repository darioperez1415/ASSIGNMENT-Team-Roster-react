import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Team from '../views/Team';
import New from '../views/New';

export default function Routes({
  players,
  player,
  setPlayers,
  setEditPlayer,
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
              user={user}
              players={players}
              setPlayers={setPlayers}
              setEditPlayer={setEditPlayer}
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
              setEditPlayer={setEditPlayer}
              user={user}
            />
          )}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    imageUrl: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
