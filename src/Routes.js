import React from "react";
import {
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";

import Home from "./containers/Home";
import PageBuilder from "./containers/PageBuilder";
import LandingPage from "./containers/LandingPage";

function Routes() {
  return (
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/build" render={() => <PageBuilder />} />
        <Route path="/page/:id" render={() => <LandingPage />} />
      </Switch>
    );
  }
  
  export default Routes;
  
