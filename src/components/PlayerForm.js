import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { createPlayer, updatePlayer } from '../api/data/playerData';

const FormStyle = styled.div``;

const initialState = {
  name: '',
  position: '',
  imageURL: '',
  number: 0,
  firebaseKey: '',
};

export default function PlayerForm({
  player,
  setPlayers,
  setEditPlayers,
  user,
}) {
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (player.firebaseKey) {
        setFormInput({
          name: player.name,
          firebaseKey: player.firebaseKey,
          number: player.number,
          imageURL: player.imageURL,
          position: player.position,
          uid: user.uid,
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
  const resetForm = () => {
    setFormInput({ ...initialState });
    setEditPlayers(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(formInput).then((players) => {
        setPlayers(players);
        resetForm();
        history.push('/new');
      });
    } else {
      createPlayer({ ...formInput }).then((players) => {
        setPlayers(players);
        resetForm();
        history.push('/team');
      });
    }
  };
  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" sm={2}>
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
        </div>
        <div>
          <label htmlFor="imageUrl" sm={2}>
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
        </div>
        <div>
          <label htmlFor="number" sm={2}>
            <input
              className="form-control form-control-lg me-1"
              type="text"
              name="number"
              id="number"
              placeholder="Enter player number"
              value={formInput.number || 0}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="position" sm={2}>
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
        </div>
        <span className="input-group-btn">
          <button className="btn btn-success submit" type="submit">
            {player.firebaseKey ? 'update' : 'submit'}
          </button>
        </span>
      </form>
    </FormStyle>
  );
}

PlayerForm.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    imageURL: PropTypes.string,
    uid: PropTypes.string,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  setPlayers: PropTypes.func.isRequired,
  setEditPlayers: PropTypes.func.isRequired,
};

PlayerForm.defaultProps = { player: {} };
