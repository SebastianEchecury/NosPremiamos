import React from 'react';
import { faSignOutAlt, faCog, faUnlockKeyhole, faUserGroup, faArchive, faEnvelope, faTasks, faCheck, faEnvelopeCircleCheck,  faLineChart } from '@fortawesome/free-solid-svg-icons';

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
import { TranslatableText } from '../translations';
import { faEnvelopeOpen} from '@fortawesome/free-regular-svg-icons';
import { Row, Col, Image, Nav } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import SidebarSpace from './sidebar-space';
export default () => {
  
  let history = useHistory();
  const logoutClickHandler = () => {
    history.push(Routes.Signin.path);
  };

  return (
    <Sidebar brand={Brand} header={Header}>
    <Link to="/" className="text-center">
      <Image fluid src={Logo} />
    </Link>
      <SidebarDivider />
      <CollapsableSidebarItem title='Configuracion' icon={faCog}>
        <CollapsableSidebarItem title='Seguridad' icon={faUnlockKeyhole}>
          {PermissionChecker(permissionsKeys.USER_ADD) && <SidebarItem title='Empleados' link="/users" icon={faUserGroup} />}          
          {PermissionChecker(permissionsKeys.PARAMETRO_UPDATE) && <SidebarItem title='Parametros' link="/parametros" icon={faCog} />}
        </CollapsableSidebarItem>
        {PermissionChecker(permissionsKeys.CATEGORIA_ADD) && <SidebarItem title='Categorias' link="/categorias" icon={faTasks} />}
      </CollapsableSidebarItem>
      {PermissionChecker(permissionsKeys.VOTO_ADD) && <SidebarItem title="Votar" link="/votar" icon={faEnvelopeOpen} />}   
      {PermissionChecker(permissionsKeys.VOTO_UPDATE) && <SidebarItem title="Control de Votos" link="/controlarvotos" icon={faEnvelopeCircleCheck} />}   
      {PermissionChecker(permissionsKeys.VOTO_VIEW_EMITIDOS) && <SidebarItem title="Mis Votos Emitidos" link="/votosemitidos" icon={faEnvelope} />}   
      {PermissionChecker(permissionsKeys.VOTO_VIEW) && <SidebarItem title="Mis Votos" link="/misvotos" icon={faArchive} />}
      {PermissionChecker(permissionsKeys.VOTO_VIEW_RANKING) && <SidebarItem title="Ranking de Votos" link="/rankingvotos" icon={faLineChart} />}
      <SidebarSpace />
      <SidebarDivider />
      <Nav.Item className="m-0 p-0">
        <Nav.Link onClick={logoutClickHandler} className="text-danger align-bottom" >
          <Row>
            <Col xs={1}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Col>
            <Col className="text-start">
              <TranslatableText  entry="Cerrar Sesion"></TranslatableText>
            </Col>
          </Row>
        </Nav.Link>
      </Nav.Item>
    </Sidebar>
  );
};