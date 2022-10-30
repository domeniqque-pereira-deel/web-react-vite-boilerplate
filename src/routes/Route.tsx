import React, { memo } from 'react';
import { Route as ReactRoute, RouteProps as ReactRouteProps, Redirect } from 'react-router-dom';
import { FullLoading } from '~/components/FullLoading';
import { useAuth } from '~/context/AuthContext';

interface Props extends ReactRouteProps {
  isPublic?: boolean;
  component: React.ComponentType;
  title?: string;
}

export const Route = memo(({ title, isPublic, component: Component, ...rest }: Props) => {
  const { isSigned } = useAuth();
  const isPrivate = !isPublic;

  const hasPermission = true;

  React.useLayoutEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  const renderMain = () => (
    // Add Layout here
    <Component />
  );

  return (
    <React.Suspense fallback={<FullLoading />}>
      <ReactRoute
        {...rest}
        render={() => {
          if (isPublic || (isSigned && hasPermission)) {
            return renderMain();
          }

          return <Redirect to={{ pathname: isPrivate ? '/login' : '/' }} />;
        }}
      />
    </React.Suspense>
  );
});
