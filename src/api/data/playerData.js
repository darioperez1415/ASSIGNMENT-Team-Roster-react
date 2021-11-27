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

const updatePlayer = (player) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/players/${player.firebaseKey}.json`, player)
    .then(() => getPlayers(player.uid).then(resolve))
    .catch(reject);
});

const deletePlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${playerObj.firebaseKey}.json`)
    .then(() => {
      getPlayers(playerObj.uid).then(resolve);
    })
    .catch(reject);
});

export {
  getPlayers, createPlayer, deletePlayer, updatePlayer,
};
