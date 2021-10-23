import React from 'react';
import PropTypes from 'prop-types';
import Players from '../components/Players';

export default function Team({
  players, setPlayers, setEditPlayers,
}) {
  return (
    <>
      <h1>THE TEAM</h1>
      {players.map((player) => (
        <Players
          key={player.firebaseKey}
          player={player}
          setEditPlayers={setEditPlayers}
          setPlayers={setPlayers}
        />
      ))}
    </>
  );
}

Team.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
};
