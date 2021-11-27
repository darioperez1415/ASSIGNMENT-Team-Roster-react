import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createPlayer = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/players.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${baseURL}/players/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getPlayers(obj.uid).then(resolve);
        });
    })
    .catch(reject);
});
const deletePlayer = (player) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/players/${player.firebaseKey}.json`)
    .then(() => getPlayers(player.uid).then(resolve))
    .catch(reject);
});
const updatePlayer = (player) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/players/${player.firebaseKey}.json`, player)
    .then(() => getPlayers(player.uid).then(resolve))
    .catch(reject);
});
export {
  getPlayers, createPlayer, deletePlayer, updatePlayer,
};
