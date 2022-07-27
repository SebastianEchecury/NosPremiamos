import React from 'react';
import { faUser, faTools, faCircle, faUserShield, faShieldAlt, faBroadcastTower, faHome, faClipboardCheck, faReceipt, faCreditCard, faMoneyBillTransfer, faWallet, faSignOutAlt, faCog, faUnlockKeyhole, faIdBadge, faUserGroup } from '@fortawesome/free-solid-svg-icons';

import Brand from './brand';
import Header from './header';
import SidebarItem from './sidebar-item'
import Sidebar from './sidebar'

import Logo from '../../assets/images/logo.png';
import SidebarDivider from './sidebar-divider';
import CollapsableSidebarItem from './collapsable-sidebar-item';
import { permissionsKeys } from '../../utils/permissionsKeys';
import PermissionChecker from '../permissionChecker';
import { Routes } from '../../routes';
import { translationsGroupNames } from '../../utils/translationsGroupNames';
import { TranslatableText, useTranslations } from '../translations';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Image, Nav } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogoutMutation } from '../../redux/apis/auth';

export default () => {
  const { translations: layoutTranslations } = useTranslations({ group: translationsGroupNames.Layout, keys: ['Configuracion', 'Dashboard', 'Procesos', 'Seguridad', 'TasaComunal'] });
  const { translations: rolesTranslations } = useTranslations({ group: translationsGroupNames.Roles, keys: ['Roles'] });
  const { translations: terminalesTranslations } = useTranslations({ group: translationsGroupNames.Terminales, keys: ['CobrarTasa', 'Cupos', 'LiquidarSaldoCuentaCorriente', 'OtorgarCuposDesdeCtg', 'TalonariosTickets', 'Terminales'] });
  const { translations: usersTranslations } = useTranslations({ group: translationsGroupNames.Users, keys: ['Users'] });

  const [logout] = useLogoutMutation();

  const logoutClickHandler = () => {
    logout();
  };

  return (
    <Sidebar brand={Brand} header={Header} className="navbar-light">
      <Link to="/">
        <Image src={Logo} className="navbar-brand-light" />
      </Link>
      <SidebarDivider />
      <CollapsableSidebarItem title={layoutTranslations.Configuracion} icon={faCog}>
        <CollapsableSidebarItem title={layoutTranslations.Seguridad} icon={faUnlockKeyhole}>
          {PermissionChecker(permissionsKeys.ROLE_MANAGER) && <SidebarItem title={rolesTranslations.Roles} link="/roles" icon={faIdBadge} />}
          {PermissionChecker(permissionsKeys.USER_MANAGER) && <SidebarItem title={usersTranslations.Users} link="/users" icon={faUserGroup} />}
        </CollapsableSidebarItem>
        {PermissionChecker(permissionsKeys.CONFIGURACION_TERMINAL_ADMINISTRAR) && <SidebarItem title={terminalesTranslations.Terminales} link={Routes.Terminales.path} icon={faBroadcastTower} />}
      </CollapsableSidebarItem>
      {PermissionChecker(permissionsKeys.REPRESENTANTE_DASHBOARD_MANAGER) && <SidebarItem title={layoutTranslations.Dashboard} link={Routes.Dashboard.path} icon={faHome} />}
      {PermissionChecker(permissionsKeys.TERMINAL_DASHBOARD_MANAGER) && <SidebarItem title={layoutTranslations.Dashboard} link={Routes.Dashboard.path} icon={faHome} />}
      {PermissionChecker(permissionsKeys.TERMINAL_TALONARIO_TICKETS_GENERAR) && <SidebarItem title={terminalesTranslations.TalonariosTickets} link={Routes.Terminales.Talonarios.path} icon={faReceipt} />}
      {PermissionChecker(permissionsKeys.TERMINAL_CUPOS_LISTA) && <SidebarItem title={terminalesTranslations.Cupos} link={Routes.Terminales.Cupos.path} icon={faClipboardCheck} />}
      {PermissionChecker(permissionsKeys.TERMINAL_LIQUIDACION_SALDO_CUENTA_CORRIENTE) && <SidebarItem title={terminalesTranslations.LiquidarSaldoCuentaCorriente} link={Routes.Terminales.Saldo.path} icon={faWallet} />}
      {PermissionChecker(permissionsKeys.TERMINAL_TASA_COBRAR) && <SidebarItem title={terminalesTranslations.CobrarTasa} link="/cobrartasa" icon={faCreditCard} />}
      <CollapsableSidebarItem title={layoutTranslations.Procesos} icon={faPlayCircle}>
        {PermissionChecker(permissionsKeys.TERMINAL_PROCESOS_OTORGAR_CUPOS_DESDE_CTG) && <SidebarItem title={terminalesTranslations.OtorgarCuposDesdeCtg} link={Routes.Terminales.Cupos.Ctg.path} icon={faCircle} />}
      </CollapsableSidebarItem>
      <SidebarDivider />
      <Nav.Item className="sticky-bottom">
        <Nav.Link onClick={logoutClickHandler}>
          <span>
            <span className="sidebar-icon text-danger"><FontAwesomeIcon icon={faSignOutAlt} /></span>
            <span className="sidebar-text text-danger">
              <TranslatableText group={translationsGroupNames.Generic} entry="Logout">Logout</TranslatableText>
            </span>
          </span>
        </Nav.Link>
      </Nav.Item>
    </Sidebar>
  );
};