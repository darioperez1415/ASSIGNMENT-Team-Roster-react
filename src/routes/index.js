import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Team from '../views/Team';
import New from '../views/New';
import Home from '../views/Home';

export default function Routes({
  players,
  player,
  setPlayers,
  setEditPlayer,
  uid,
}) {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/Team"
          component={() => (
            <Team
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
              player={player}
              setPlayers={setPlayers}
              setEditPlayer={setEditPlayer}
              uid={uid}
            />
          )}
        />
        <Route
          exact
          path="/"
          component={() => (
            <Home
              player={player}
              setPlayers={setPlayers}
              setEditPlayer={setEditPlayer}
              uid={uid}
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
  }),
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

Routes.defaultProps = { player: {} };
