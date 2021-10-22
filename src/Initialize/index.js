import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Navigation from '../components/Navigation';
import { getPlayers } from '../api/data/playerData';
import Routes from '../routes';
import SignIn from '../views/SignIn';

function Initialize() {
  const [players, setPlayers] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photURL,
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
            <Navigation />
            <h1>Liverpool FC</h1>
            <Routes
              players={players}
              setPlayers={setPlayers}
              player={editItem}
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
