import React from 'react';
import { Route, } from "react-router-dom";

let RouteWithLoader = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <Component {...props} />
      </div>
    )} />
  );
};

export default RouteWithLoader;