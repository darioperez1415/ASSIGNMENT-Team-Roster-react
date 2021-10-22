import React from 'react';
import PropTypes from 'prop-types';
import PlayerForm from '../components/PlayerForm';

export default function New({
  player, setPlayers, setEditPlayer, uid,
}) {
  // const [editPlayer, setEditPlayer] = useState([]);

  return (
    <>
      <h1>Add A Player</h1>
      <PlayerForm
        player={player}
        setPlayers={setPlayers}
        setEditPlayer={setEditPlayer}
        uid={uid}
      />
    </>
  );
}

New.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    imageUrl: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

New.defaultProps = { player: {} };
