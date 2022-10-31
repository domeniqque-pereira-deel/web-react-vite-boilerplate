import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { FullLoading } from '~/components/FullLoading';
import { useAuth } from '~/context/AuthContext';
import { Route } from './Route';

const Home = React.lazy(() => import('~/views/Home'));
const Login = React.lazy(() => import('~/views/Login'));

export const Routes = () => {
  const { isFetchingProfile } = useAuth();

  if (isFetchingProfile) {
    return <FullLoading />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} isPublic isPage />
      </Switch>
    </BrowserRouter>
  );
};
