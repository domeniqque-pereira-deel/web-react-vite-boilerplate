import React, { memo, useMemo } from 'react';
import { Route as ReactRoute, RouteProps as ReactRouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';
import { DashboardLayout } from '~/layouts/Dashboard';
import { PageLayout } from '~/layouts/Page';

interface Props extends ReactRouteProps {
  isPublic?: boolean;
  isPage?: boolean;
  component: React.ComponentType;
  title?: string;
}

export const Route = memo(({ title, isPublic, component: Component, isPage, ...rest }: Props) => {
  const { isSigned } = useAuth();

  const isPrivate = !isPublic;
  const hasPermission = true;

  const Layout = isPage ? PageLayout : DashboardLayout;

  React.useLayoutEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  const renderMain = () => (
    <Layout>
      <Component />
    </Layout>
  );

  return (
    <ReactRoute
      {...rest}
      render={() => {
        if (isPrivate && !hasPermission) {
          return <Redirect to={{ pathname: isSigned ? '/' : '/login' }} />;
        }

        if (isPrivate === isSigned) {
          return renderMain();
        }

        return <Redirect to={{ pathname: isPrivate ? '/login' : '/' }} />;
      }}
    />
  );
});
