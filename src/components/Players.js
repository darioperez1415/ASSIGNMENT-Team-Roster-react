import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { deletePlayer } from '../api/data/playerData';

const PlayersStyle = styled.div`
  margin-left: 10px;
  width: 50%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin: 10px;
  padding-top: 40px;
  display: block;
  font-weight: bolder;
  flex-wrap: wrap;
  flex-direction: row;
  div.card-body {
    align-items: center;
  }
  img {
    width: 200px;
    height: 200px;
  }
  button {
    margin: 10px;
    width: 100px;
    height: 50px;
  }
`;
const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Players({ player, setPlayers, setEditPlayers }) {
  const history = useHistory();

  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player).then(setPlayers);
    } else if (method === 'update') {
      setEditPlayers(player);
      history.push('/New');
    }
  };
  return (
    <>
      <PlayersStyle>
        <div className="card m-3" style={{ width: '18rem' }}>
          <img
            style={{ width: '18rem' }}
            alt={player.name}
            src={player.imageURL}
          />
          <div className="card-body">
            <h4 className="card-title">{player.name}</h4>
            <hr />
            <p className="card-text">Poition: {player.position}</p>
            <p>Number:{player.number}</p>
            <ButtonStyle>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => setEditPlayers('update')}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleClick('delete')}
                color="danger"
              >
                Delete
              </button>
            </ButtonStyle>
          </div>
        </div>
      </PlayersStyle>
    </>
  );
}
Players.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    imageURL: PropTypes.string,
    position: PropTypes.string,
    number: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
};
