import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from 'views/weather/main';
import './App.scss';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          name="Weatehr Page"
          render={(props) => <Main {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
