import React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Demo } from './Demo';
import { Mock1 } from './Mock1';
import { Mock2 } from './Mock2';
import { Mock3 } from './Mock3';
import { Mock4 } from './Mock4';

// Import global styles so they take affect
// These are for app-wide settings and tools such as home made mix-ins
// Component-specific CSS is kept adjacent to component code
import '../styles/styles.css';

const App: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/demo/:expressId' component={Demo} />

    {/* These 'Mock' components are to kick off development of the 'Customer Portal'.
    Nothing special about them. */}
    <Route exact path='/mock1' component={Mock1} />
    <Route exact path='/mock2' component={Mock2} />
    <Route exact path='/mock3' component={Mock3} />
    <Route exact path='/mock4' component={Mock4} />

    {/* Redirect insures we always have something sensible to render */}
    <Redirect to='/demo/demoExpressId' />
  </Switch>
);

export default hot(module)(App);
