import React from 'react';
import { Switch } from "react-router-dom";
import { Routes } from "../../routes";

// pages
import Dashboard from "../dashboard";
import Signin from "../auth/signin";
import VerifyEmailPassword from "../auth/lostpassword/verifyEmail"

// components
import RouteWithLoader from "../../components/routeWithLoader/RouteWithLoader";
import RouteWithSidebar from "../../components/routeWithSidebar/RouteWithSidebar";

import NotFound from '../notFound/NotFound';
import Users from '../users'
import User from '../users/form';
import Categorias from '../categorias';
import Categoria from '../categorias/form'
import LostPassword from './../auth/lostpassword/index';
import ChangePassword from '../auth/account/changepassword';
import SuccessPassword from './../auth/account/changepassword/successPassword/index';
import votar from '../votar';
import EmpleadosCategoriasAprobador from '../categorias/empleadocategoria';
import Controlarvotos from '../controlarvotos'

import { useGetHeaderQuery } from '../../redux/apis/users';
import Parametros from '../parametros';
import Parametro from '../parametros/form';
import Rankingvotos from '../rankingvotos';
import Misvotos from '../misvotos';
import VotosEmitidos from '../votosemitidos';

const HomePage = () => {
  const { data: header = {} } = useGetHeaderQuery();

  return (
    <Switch>
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.LostPassword.path} component={LostPassword} />
      <RouteWithLoader exact path={Routes.LostPassword.VerifyEmail.path} component={VerifyEmailPassword} />
      <RouteWithLoader exact path={Routes.AccountChangePassword.SuccessPassword.path} component={SuccessPassword} />
      <RouteWithLoader exact path={Routes.AccountChangePassword.path} component={({ location }) => {
        const params = new URLSearchParams(location.search);
        const userId = params.get('userId');
        const resetCode = params.get('resetCode');
        return <ChangePassword userId={userId} resetCode={resetCode} />
      }} />
      <>
        <RouteWithSidebar exact path={Routes.Dashboard.path} component={Dashboard} />

        <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
        <RouteWithSidebar exact path={Routes.Users.Create.path} component={User} />
        <RouteWithSidebar exact path={Routes.Users.Delete.path} component={Users} />
        <RouteWithSidebar exact path={Routes.Users.Update.path} component={({ match }) => <User Id={match.params.Id} />} />

        <RouteWithSidebar exact path={Routes.Categorias.path} component={Categorias} />
        <RouteWithSidebar exact path={Routes.Categorias.Create.path} component={Categoria} />
        <RouteWithSidebar exact path={Routes.Categorias.Delete.path} component={Categorias} />
        <RouteWithSidebar exact path={Routes.Categorias.Update.path} component={({ match }) => <Categoria Id={match.params.Id} />} />
        <RouteWithSidebar exact path={Routes.EmpleadosCategoriasAprobador.Delete.path} component={EmpleadosCategoriasAprobador} />

        <RouteWithSidebar exact path={Routes.Parametros.path} component={Parametros} />
        <RouteWithSidebar exact path={Routes.Parametros.Update.path} component={({ match }) => <Parametro Id={match.params.Id} />} />

        <RouteWithSidebar exact path={Routes.Votar.path} component={votar} />
        <RouteWithSidebar exact path={Routes.NotFound.path} component={NotFound} />

        <RouteWithSidebar exact path={Routes.Controlarvotos.path} component={Controlarvotos} />
        <RouteWithSidebar exact path={Routes.Controlarvotos.Delete.path} component={Controlarvotos} />
        <RouteWithSidebar exact path={Routes.Controlarvotos.Update.path} component={Controlarvotos} />

        <RouteWithSidebar exact path={Routes.Rankingvotos.path} component={Rankingvotos} />
        <RouteWithSidebar exact path={Routes.Misvotos.path} component={Misvotos} />
        <RouteWithSidebar exact path={Routes.VotosEmitidos.path} component={VotosEmitidos} />

      </>
    </Switch>
  );
}
export default HomePage;