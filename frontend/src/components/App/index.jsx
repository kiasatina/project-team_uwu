import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../../pages";
import "semantic-ui-css/semantic.min.css";
import "./index.scss";

export const App = () => {
  return (
    <Suspense fallback={"lol"}>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    </Suspense>
  );
};
