import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
}
  from 'reactstrap';
import { deletePlayer, getPlayers, updatePlayer } from '../api/data/playerData';

const CardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
  margin: auto;

`;

export default function Players({ player, setPlayers, setEditPlayers }) {
  const history = useHistory();

  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player.firebaseKey).then(() => getPlayers(player.uid).then(setPlayers));
    } else {
      updatePlayer(player.uid).then(setPlayers);
    }
  };

  return (
    <CardStyle>
      <Card>
        <CardImg top width="100%" src={player.imageUrl} />
        <CardBody>
          <CardTitle tag="h5">{player.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{player.number}</CardSubtitle>
          <CardText>{player.position}</CardText>
          <Button
            className="btn btn-info"
            onClick={() => {
              setEditPlayers(player);
              history.push('/new');
            }}
          >Edit
          </Button>
          <Button
            onClick={() => handleClick('delete')}
            className="btn btn-danger"
            type="button"
            id="delete"
          >Delete
          </Button>
        </CardBody>
      </Card>
    </CardStyle>
  );
}

Players.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    number: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func,
};

Players.defaultProps = { setEditPlayers: () => {} };
