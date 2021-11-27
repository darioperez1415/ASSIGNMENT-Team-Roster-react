import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { deletePlayer } from '../api/data/playerData';

const PlayersStyle = styled.div`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  flex-wrap: wrap;
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

export default function Players({ player, setPlayers, setEditPlayer }) {
  const history = useHistory();

  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player).then(setPlayers);
    }
    if (method === 'edit') {
      setEditPlayer(player);
      history.push('/New');
    }
  };
  return (
    <>
      <PlayersStyle>
        <div className="card" style={{ width: '18rem', margin: '3px' }}>
          <img alt={player.name} src={player.imageURL} />
          <div className="card-body">
            <h4 className="card-title">{player.name}</h4>
            <hr />
            <p className="card-text">Poition{player.position}</p>
            <p className="card-number">Number{player.number}</p>
            <ButtonStyle>
              <button
                onClick={() => setEditPlayer(player)}
                className="btn btn-info"
                type="button"
              >
                Edit
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
    number: PropTypes.number,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
};
