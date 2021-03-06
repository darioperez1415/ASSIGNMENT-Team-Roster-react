import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayerForm from '../components/PlayerForm';

const NewStyle = styled.div`
  font-size: large;
  color: white;
  text-shadow:1em;
`;

export default function New({
  player, setPlayers, setEditPlayers, user,
}) {
  return (
    <>
      <NewStyle>
        <h1>Add A Player</h1>
        <PlayerForm
          player={player}
          setPlayers={setPlayers}
          setEditPlayers={setEditPlayers}
          user={user}
        />
      </NewStyle>
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
  setEditPlayers: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

New.defaultProps = { player: {} };
