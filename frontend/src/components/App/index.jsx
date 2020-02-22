import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../../pages';

export const App = () => {
  return (
    <Suspense fallback={'lol'}>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    </Suspense>
  );
};
