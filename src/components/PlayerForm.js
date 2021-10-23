import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createPlayer, updatePlayer } from '../api/data/playerData';

const initialState = {
  name: '',
  position: '',
  imageURL: '',
  number: '',
};

export default function PlayerForm({
  player, setPlayers, setEditPlayer,
}) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();
  useEffect(() => {
    let isMounted = true;
    if (player.firebaseKey) {
      if (isMounted) {
        setFormInput({
          name: player.name,
          firebaseKey: player.firebaseKey,
          imageURL: player.imageURL,
          position: player.position,
          uid: player.uid,
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [player]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const restForm = () => {
    setFormInput(initialState);
    setEditPlayer({ initialState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(formInput).then((players) => {
        setPlayers(players);
        restForm();
        history.push('/team');
      });
    } else {
      createPlayer(formInput).then((players) => {
        setPlayers(players);
        restForm();
        history.push('/team');
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          className="input-group"
        >
          <input
            className="form-control form-control-lg me-1"
            type="text"
            name="name"
            id="name"
            placeholder="Enter player name"
            value={formInput.name || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label
          className="input-group"
        >
          <input
            className="form-control form-control-lg me-1"
            type="url"
            name="imageURL"
            id="imageURL"
            placeholder="Enter Image Url"
            value={formInput.imageURL || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label
          className="input-group"
        >
          <input
            className="form-control form-control-lg me-1"
            type="number"
            name="number"
            id="number"
            placeholder="Enter player number"
            value={formInput.number || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label
          className="input-group"
        >
          <input
            className="form-control form-control-lg me-1"
            type="text"
            name="position"
            id="position"
            placeholder="Position: Att, Mid,Def"
            value={formInput.position || ''}
            onChange={handleChange}
            required
          />
        </label>
        <span className="input-group-btn">
          <button className="btn btn-success submit" type="submit">
            {player.firebaseKey ? 'UPDATE' : 'SUBMIT'}
          </button>
        </span>
      </form>
    </>
  );
}

PlayerForm.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    imageURL: PropTypes.string,
  }),
    user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
};

PlayerForm.defaultProps = { player: {} };
