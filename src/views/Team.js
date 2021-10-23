import React from 'react';
import PropTypes from 'prop-types';
import Players from '../components/Players';

export default function Team({
  players, setPlayers, setEditPlayer, user,
}) {
  return (
    <>
      <h1>THE TEAM</h1>
      {players.map((player) => (
        <Players
          key={player.firebaseKey}
          players={players}
          player={player}
          setEditPlayer={setEditPlayer}
          setPlayers={setPlayers}
          user={user}
        />
      ))}
    </>
  );
}

Team.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};

Team.defaultProps = { user: {} };
