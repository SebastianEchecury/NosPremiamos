import React, { useState, useEffect } from 'react';
import { Route, } from "react-router-dom";
import Preloader from "../Preloader";
import { Routes } from "../../routes";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

let RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  let history = useHistory();

 

  return (
    <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
  );
};

export default RouteWithLoader;