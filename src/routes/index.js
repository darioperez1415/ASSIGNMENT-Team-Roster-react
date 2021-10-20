import React from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import Players from '../components/Players';
import PlayersForm from '../components/PlayersForm';

export default function Routes({ players, setPlayers, setEditItems}) {
  return(
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
             <Players player={player} setPlayers={setPlayers} setEditItem={setEditItem} />
            )}
           />
          <Route exact path="/new" component={() => <PlayersForm />} />  
        </Switch>
      </div>
  )  
}

Routes.propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    setPlayers: PropTypes.func.isRequired,
    setEditItem: PropTypes.func.isRequired,
  };