import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import SignIn from '../views/SignIn';
import Navigation from '../components/Navigation';
import Routes from '../routes';
import { getPlayers } from '../api/data/playerData';

function Initialize() {
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [editPlayers, setEditPlayers] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0],
        };
        setUser(userInfoObj);
        getPlayers(userInfoObj.uid).then(setPlayers);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      {
        user ? (
          <>
            <Navigation />
            <Routes
              players={players}
              player={editPlayers}
              setPlayers={setPlayers}
              setEditPlayers={setEditPlayers}
              user={user}
            />;
          </>
        ) : (
          <SignIn user={user} />
        )
        }
    </>
  );
}

export default Initialize;
