import React, { useState, useEffect } from 'react';
import {
  Form, Input, FormGroup, Label, Button,
} from 'reactstrap';
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
        uid: player.uid,
      });
    }
  }, [player]);

  const restForm = () => {
    setFormInput({ ...initialState });
    setEditPlayer({});
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            className="form-control form-control-lg me-1"
            type="text"
            id="name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="number" sm={2}>
            Number
          </Label>
          <Input
            type="text"
            name="number"
            id="number"
            placeholder="Add a number"
            value={formInput.number}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="imageUrl" sm={2}>
            Image URL
          </Label>
          <Input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Add an image URL"
            value={formInput.imageUrl}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Label for="position" sm={2}>
          Position
        </Label>
        <Input
          className="form-select"
          type="select"
          name="position"
          id="position"
          value={formInput.position}
          onChange={handleChange}
          required
        >
          <option hidden value="">
            Select a position
          </option>
          <option value="Attacker">Attacker</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="GoalKepper">GoalKepper</option>
        </Input>
        <Button className="btn btn-success" type="submit">
          {player.firebaseKey ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </div>
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
  user: PropTypes.shape({
    uid: PropTypes.string,
}).isRequired,
};
