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

export default function Players({ player, setPlayers, setEditItem}) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player.firebaseKey).then(setPlayers);
    } else {
      updatePlayer().then(setPlayers)
    }
  };

 return (
    <div>
      <Card>
        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Edit</Button>
          <Button onClick={() => handleClick('delete')}
          className="btn btn-danger"
          type="button">Delete
          </Button>
        </CardBody>
      </Card>
    </div>
 )  
}

Players.propTypes = {
    player: PropTypes.shape({
    name: PropTypes.string,
    complete: PropTypes.bool,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    }).isRequired,
    setPlayers: PropTypes.func.isRequired,
    setEditItem: PropTypes.func.isRequired,
};
