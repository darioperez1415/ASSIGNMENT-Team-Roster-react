import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getPlayers = () => new Promise ((resolve, reject) => {
  axios
    .get(`${baseURL}/players.json`)
    .then((response) => {
      if (response.data) {   
        resolve(Object.values(response.data));
    } else {
     resolve([])
    }
    })
    .catch(reject)
});

const createPlayer = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/players.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/palyers/${firebaseKey}.json`,{ firebaseKey})
        .then(() => {
          getPlayers().then(resolve)
        });
    })
    .catch(reject);
});

const deletePlayer = (firebaseKey) => new Promise((resolve, reject) =>{
  axios.delete(`${baseURL}/players${firebaseKey}.json`)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
})

const updatePlayer = (playerObj) => new Promise((resolve,reject) => {
  axios
    .patch(`${baseURL}/players/${playerObj.firebaseKey}.json`, playerObj)
    .then(() => getPlayers().then(resolve))
    .catch(reject);
});

export {
  getPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer
} 