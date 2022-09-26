import React from 'react';
import { Switch } from "react-router-dom";
import { Routes } from "../../routes";
import { permissionsKeys } from '../../utils/permissionsKeys'

// pages
import Dashboard from "../dashboard";
import Signin from "../auth/signin";
import Signup from "../auth/signup";
import VerifyEmail from "../auth/signup/verifyEmail";
import VerifyEmailPassword from "../auth/lostpassword/verifyEmail"

// components
import RouteWithLoader from "../../components/routeWithLoader/RouteWithLoader";
import RouteWithSidebar from "../../components/routeWithSidebar/RouteWithSidebar";

//administrador sistema
import Terminales from '../sistema/terminal';
import Terminal from '../sistema/terminal/form';

import NotFound from '../notFound/NotFound';
import Users from '../users'
import User from '../users/form';
import Roles from '../roles'
import Role from '../roles/form';
import Categorias from '../categorias';
import Categoria from '../categorias/form'
import { OtorgarCupos, OtorgarCuposCtg, Saldo, Talonarios } from '../terminales';
import TalonarioTicketsForm from'../terminales/grillaTalonarios/form';
import Patentes from '../patentes';
import Patente from '../patentes/form';
import TalonariosTickets from '../terminales/grillaTalonarios'
import Cupos from '../terminales/grillaCupos'
import LostPassword from './../auth/lostpassword/index';
import ChangePassword from '../auth/account/changepassword';
import SuccessPassword from './../auth/account/changepassword/successPassword/index';
import cobrartasa from '../cobrartasa';
import EmpleadosCategoriasAprobador from '../categorias/empleadocategoria';

import { useGetHeaderQuery } from '../../redux/apis/users';
import Parametros from '../parametros';
import Parametro from '../parametros/form';

const HomePage = () => {
  const { data: header = {} } = useGetHeaderQuery();

  return (
    <Switch>
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
      <RouteWithLoader exact path={Routes.LostPassword.path} component={LostPassword} />
      <RouteWithLoader exact path={Routes.Signup.VerifyEmail.path} component={VerifyEmail} />
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

        <RouteWithSidebar exact path={Routes.Roles.path} component={Roles} />
        <RouteWithSidebar exact path={Routes.Roles.Create.path} component={Role} />
        <RouteWithSidebar exact path={Routes.Roles.Delete.path} component={Roles} />
        <RouteWithSidebar exact path={Routes.Roles.Update.path} component={({ match }) => <Role id={match.params.id} />} />
        <RouteWithSidebar exact path={Routes.Roles.View.path} component={({ match }) => <Role id={match.params.id} disabled={true} />} />

        <RouteWithSidebar exact path={Routes.GestionarPatentes.path} component={Patentes} />
        <RouteWithSidebar exact path={Routes.GestionarPatentes.Create.path} component={Patente} />
        <RouteWithSidebar exact path={Routes.GestionarPatentes.Delete.path} component={Patentes} />

        <RouteWithSidebar exact path={Routes.Terminales.path} component={Terminales} />
        <RouteWithSidebar exact path={Routes.Terminales.Create.path} component={Terminal} />
        <RouteWithSidebar exact path={Routes.Terminales.Delete.path} component={Terminales} />
        <RouteWithSidebar exact path={Routes.Terminales.Update.path} component={({match}) => <Terminal id={match.params.id} />} />
        <RouteWithSidebar exact path={Routes.Terminales.View.path} component={({match}) => <Terminal id={match.params.id} disabled={true} />} />

        <RouteWithSidebar exact path={Routes.Terminales.Cupos.path} component={() => <Cupos id={header.terminal?.id} />} />
        <RouteWithSidebar exact path={Routes.Terminales.Cupos.Otorgar.path} component={() => <OtorgarCupos id={header.terminal?.id} />} />
        <RouteWithSidebar exact path={Routes.Terminales.Cupos.Ctg.path} component={() => <OtorgarCuposCtg id={header.terminal?.id} />} />
        <RouteWithSidebar exact path={Routes.Terminales.Saldo.path} component={() => <Saldo id={header.terminal?.id} />} />
        <RouteWithSidebar exact path={Routes.Terminales.Talonarios.path} component={() => <TalonariosTickets id={header.terminal?.id} />} />
        <RouteWithSidebar exact path={Routes.Terminales.Talonarios.Generar.path} component={() => <Talonarios id={header.terminal?.id} />} />
        <RouteWithSidebar exact path={Routes.Terminales.Talonarios.View.path} component={({match}) => <TalonarioTicketsForm id={match.params.id} />} />
        <RouteWithSidebar exact path={Routes.CobrarTasa.path} component={cobrartasa} />
        <RouteWithSidebar exact path={Routes.NotFound.path} component={NotFound} />
      </>
    </Switch>
  );
}
export default HomePage;