import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createPlayer = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/players.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/players/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getPlayers(obj.uid).then(resolve);
        });
    })
    .catch(reject);
});

const updatePlayer = (playerObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/player/${playerObj.firebaseKey}.json`, playerObj).then(() => {
    getPlayers(uid).then(resolve);
  }).catch(reject);
});

const deletePlayer = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/players/${firebaseKey}.json`)
    .then(() => {
      getPlayers(uid).then(resolve);
    })
    .catch(reject);
});

export {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
