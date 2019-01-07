import React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Demo } from './Demo';

// Import global styles so they take affect
// These are for app-wide settings and tools such as home made mix-ins
// Component-specific CSS is kept adjacent to component code
import '../styles/styles.css';

const App: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/' component={Demo} />
    <Redirect to='/' />
  </Switch>
);

export default hot(module)(App);
