import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import EditorPage from './containers/EditorPage';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.EDITOR} component={EditorPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
