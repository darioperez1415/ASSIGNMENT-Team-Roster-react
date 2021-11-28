import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Players from '../components/Players';

const TeamStyle = styled.div`
  font-size: large;
  text-shadow: 1em;
  .h1,
  h1 {
    color: white;
  }
`;

export default function Team({
  players, setPlayers, setEditPlayers, user,
}) {
  return (
    <>
      <TeamStyle>
        <h1>Roster</h1>
        {players.map((player) => (
          <Players
            key={player.firebaseKey}
            player={player}
            setEditPlayers={setEditPlayers}
            setPlayers={setPlayers}
            user={user}
          />
        ))}
      </TeamStyle>
    </>
  );
}

Team.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};

Team.defaultProps = { user: {} };
