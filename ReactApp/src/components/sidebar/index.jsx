import React from 'react';
import { faUser, faTools, faCircle, faUserShield, faShieldAlt, faBroadcastTower, faHome, faClipboardCheck, faReceipt, faCreditCard, faMoneyBillTransfer, faWallet, faSignOutAlt, faCog, faUnlockKeyhole, faIdBadge, faUserGroup, faArchive, faEnvelope, faTasks, faCheck, faEnvelopeCircleCheck, faEnvelopesBulk, faLineChart } from '@fortawesome/free-solid-svg-icons';

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
import { faEnvelopeOpen, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Image, Nav } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

export default () => {
  const { translations: layoutTranslations } = useTranslations({ group: translationsGroupNames.Layout, keys: ['Configuracion', 'Dashboard', 'Procesos', 'Seguridad', 'TasaComunal'] });

  const { translations: terminalesTranslations } = useTranslations({ group: translationsGroupNames.Terminales, keys: ['CobrarTasa', 'Cupos', 'LiquidarSaldoCuentaCorriente', 'OtorgarCuposDesdeCtg', 'TalonariosTickets', 'Terminales'] });
  
  let history = useHistory();

  

  const logoutClickHandler = () => {
    history.push(Routes.Signin.path);
  };

  return (
    <Sidebar brand={Brand} header={Header} className="navbar-light">
      <Link to="/">
        <Image src={Logo} className="navbar-brand-light" />
      </Link>
      <SidebarDivider />
      <CollapsableSidebarItem title='Configuracion' icon={faCog}>
        <CollapsableSidebarItem title='Seguridad' icon={faUnlockKeyhole}>
          {PermissionChecker(permissionsKeys.USER_ADD) && <SidebarItem title='Empleados' link="/users" icon={faUserGroup} />}          
          {PermissionChecker(permissionsKeys.PARAMETRO_UPDATE) && <SidebarItem title='Parametros' link="" icon={faCog} />}
        </CollapsableSidebarItem>
        {PermissionChecker(permissionsKeys.CATEGORIA_ADD) && <SidebarItem title='Categorias' link="" icon={faTasks} />}
      </CollapsableSidebarItem>
      {PermissionChecker(permissionsKeys.VOTO_ADD) && <SidebarItem title="Votar" link="" icon={faEnvelopeOpen} />}   
      {PermissionChecker(permissionsKeys.VOTO_UPDATE) && <SidebarItem title="Control de Votos" link="" icon={faEnvelopeCircleCheck} />}   
      {PermissionChecker(permissionsKeys.VOTO_VIEW_EMITIDOS) && <SidebarItem title="Mis Votos Emitidos" link="" icon={faEnvelope} />}   
      {PermissionChecker(permissionsKeys.VOTO_VIEW) && <SidebarItem title="Mis Votos" link="" icon={faArchive} />}
      {PermissionChecker(permissionsKeys.VOTO_VIEW_RANKING) && <SidebarItem title="Ranking de Votos" link="" icon={faLineChart} />}

      <SidebarDivider />
      <Nav.Item className="sticky-bottom">
        <Nav.Link onClick={logoutClickHandler}>
          <span>
            <span className="sidebar-icon text-danger"><FontAwesomeIcon icon={faSignOutAlt} /></span>
            <span className="sidebar-text text-danger">
              <TranslatableText  entry="Cerrar sesión"/>
            </span>
          </span>
        </Nav.Link>
      </Nav.Item>
    </Sidebar>
  );
};