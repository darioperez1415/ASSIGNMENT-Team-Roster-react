import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Navigation from '../components/Navigation';
import { getPlayers } from '../api/data/playerData';
import Routes from '../routes';
import SignIn from '../views/SignIn';

function Initialize() {
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [editItem, setEditItem] = useState({});

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
        getPlayers().then(setPlayers);
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
            <Navigation user={user} />
            <h1>Liverpool FC</h1>
            <Routes
              players={players}
              player={editItem}
              setPlayers={setPlayers}
              setEditItem={setEditItem}
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
