import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from './Route';

const Home = React.lazy(() => import('~/views/Home'));
const Login = React.lazy(() => import('~/views/Login'));

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} isPublic />
      </Switch>
    </BrowserRouter>
  );
};
