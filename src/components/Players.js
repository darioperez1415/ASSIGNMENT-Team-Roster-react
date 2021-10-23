import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
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
import { deletePlayer, getPlayers } from '../api/data/playerData';

export default function Players({
  player, setPlayers, setEditItem, user,
}) {
  const history = useHistory();

  const handleClick = (method) => {
    if (method === 'delete') {
      deletePlayer(player.firebaseKey, player.uid).then((playerArray) => {
        setPlayers(playerArray);
      });
    } else if (method === 'edit') {
      setPlayers(player);
      history.push('/New');
    }
  };

  useEffect(() => {
    let isMounted = true;
    getPlayers(user.uid).then((playerArray) => {
      if (isMounted) setPlayers(playerArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Card>
        <CardImg top width="100%" src={player.imageUrl} alt={player.name} />
        <CardBody>
          <CardTitle tag="h5">{player.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{player.number}</CardSubtitle>
          <CardText>{player.position}</CardText>
          <Button
            onClick={() => setEditItem('edit')}
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
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

Players.defaultProps = { setEditItem: () => {} };
