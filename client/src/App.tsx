import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { ERoutes } from './enums'
import { Auth, NotFound, Chat } from './pages'
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Router>
        <Switch>
          <Route path={ERoutes.Login}>
            <Auth />
          </Route>
          <Route path={ERoutes.Main}>
            <Chat />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
