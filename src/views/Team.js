import React from 'react';
import PropTypes from 'prop-types';
import Players from '../components/Players';

export default function Team({ players, setPlayers, setEditPlayer }) {
  return (
    <>
      <h1>TEAM</h1>
      {players.length ? (
        players.map((player) => (
          <Players
            key={player.firebaseKey}
            players={player}
            setEditPlayer={setEditPlayer}
            setPlayers={setPlayers}
          />
        ))
      ) : (
        <h3>No Players Added</h3>
      )}
    </>
  );
}

Team.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
};
