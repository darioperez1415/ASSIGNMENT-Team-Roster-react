import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from "../api/data/playerData";


const initialState = {
    id: '',
    imageURL: '',
    name: '',
    position: '',
    udi: ''
},

export default function PlayersForm ({ obj, setPlayers, setEditItem}) {
    const [formInput, setFormInput ] = useState(initialState);


useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        position: obj.position,
        date: obj.date,
        image: obj.image,
        id: obj.id,
        uid: obj.uid,
      })
    }
}, [obj]);

const restForm = () => {
    setFormInput({ ...initialState});
    setEditItem({});
}

const handleChange = (e) => {
  setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,      
  }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
        updatePlayer(formInput).then((players) => {
         setPlayers(players);
         restForm();
        });
    } else {
        createPlayer({ ...formInput, date: new Date() }).then((players) => {
          setPlayers(players);
          restForm();  
        });
    }
};

return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex">
          <input
            className="form-control form-control-lg me-1"
            type="text"
            id="name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            placeholder="ADD A TO-DO"
            required
          />
          <button className="btn btn-success" type="submit">
            {obj.firebaseKey ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

PlayersForm.prototype = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
    uid: PropTypes.string,
  }),
  setPlayers: PropTypes.func.isRequired,
  setEditItem: PropTypes.func.isRequired,
};

PlayersForm.defaultProps = {
    obj: {},
};