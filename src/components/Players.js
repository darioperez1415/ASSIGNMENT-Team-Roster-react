import React from 'react';
import PropTypes from 'prop-types';
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
import { deletePlayer, updatePlayer } from '../api/data/playerData';

export default function Players({ player, setPlayers, setEditItem }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player.firebaseKey).then(setPlayers);
    } else {
      updatePlayer(player).then(setPlayers);
    }
  };

  return (
    <div>
      <Card>
        <CardImg top width="100%" src={player.imageUrl} alt={player.name} />
        <CardBody>
          <CardTitle tag="h5">{player.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{player.number}</CardSubtitle>
          <CardText>{player.position}</CardText>
          <Button
            onClick={() => setEditItem('delete')}
            className="btn btn-danger"
            type="button"
          >Edit
          </Button>
          <Button
            onClick={() => handleClick('delete')}
            className="btn btn-danger"
            type="button"
          >Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

Players.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    number: PropTypes.number,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func,
};

Players.defaultProps = { setEditItem: () => {} };
