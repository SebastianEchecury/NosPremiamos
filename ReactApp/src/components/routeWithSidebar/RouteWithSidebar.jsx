import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory, } from 'react-router-dom';

import { Routes } from '../../routes';

import Sidebar from '../sidebar';
import Navbar from '../navbar';
import Footer from "../footer";

let RouteWithSidebar = ({ permission, component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!auth.token)
      history.push(Routes.Signin.path);
  }, [auth.token]);

  return (
    <Route {...rest} render={props => (
      <div className="d-flex">
        <nav className="vh-100 p-4 d-none d-lg-block shadow bg-white" style={{ width: '300px', minWidth: '300px' }}>
          <Sidebar />
        </nav>
        <div className="flex-fill bg-light">
          <div className="vh-100 d-flex flex-column">
            <header className="px-4">
              <Navbar />
            </header>
            <main className="flex-fill p-4 overflow-auto">
              <Component {...props} />
            </main>
            <footer className="p-4">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    )}
    />
  );
};

export default RouteWithSidebar;