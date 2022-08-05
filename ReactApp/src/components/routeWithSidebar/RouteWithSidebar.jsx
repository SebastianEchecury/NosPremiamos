import React, { useState, useEffect } from 'react';
import { Route, } from "react-router-dom";
import Preloader from "../Preloader";
import { useHistory } from 'react-router-dom';
import { Routes } from "../../routes";

import Sidebar from '../sidebar';
import Navbar from '../navbar';
import Footer from "../footer";
import { useSelector } from 'react-redux';

let RouteWithSidebar = ({ permission, component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const auth = useSelector((state) => state.auth);

  let history = useHistory();

  useEffect(() => {
    if (!auth.token)
      history.push(Routes.Signin.path)

    /*if (PathKey !== undefined && Permission !== undefined && !Permission.some(x => x === PathKey)) {
      history.push(Routes.NotFound.path)
    }*/
    
  }, [auth.token]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />
        <div className="content px-0">
          <Navbar />
        </div>
        <main className="content">
          <Component {...props} />
          <Footer />
        </main>
      </>
    )}
    />
  );
};

export default RouteWithSidebar;