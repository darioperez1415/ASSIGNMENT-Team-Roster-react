import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../api/data/playerData';

const initialState = {
  id: '',
  imageURL: '',
  name: '',
  position: '',
  udi: '',
};

export default function PlayerForm({
  player, setPlayers, setEditPlayer, uid,
}) {
  const [formInput, setFormInput] = useState(initialState);
  useEffect(() => {
    if (player.firebaseKey) {
      setFormInput({
        name: player.name,
        firebaseKey: player.firebaseKey,
        position: player.position,
        imageUrl: player.imageUrl,
        number: player.number,
        uid,
      });
    }
  }, [player]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const restForm = () => {
    setFormInput({ ...initialState });
    setEditPlayer({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(formInput).then((players) => {
        setPlayers(players);
        restForm();
      });
    } else {
      createPlayer(formInput).then((players) => {
        setPlayers(players);
        restForm();
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
            value={formInput.name}
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
            name="imageUrl"
            id="imageUrl"
            placeholder="Enter Image Url"
            value={formInput.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
        <label
          className="input-group"
        >
          <input
            className="form-control form-control-lg me-1"
            type={Number}
            name="number"
            id="number"
            placeholder="Enter player number"
            value={formInput.number}
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
            value={formInput.position}
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
    imageUrl: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditPlayer: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

PlayerForm.defaultProps = { player: {} };
