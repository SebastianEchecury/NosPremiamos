import React from 'react'
import { Button } from '@themesberg/react-bootstrap';

import { TranslatableText, useTranslations } from '../../../components/translations';
import { useHistory } from 'react-router-dom';
import { permissionsKeys } from '../../../utils/permissionsKeys';
import PermissionChecker from '../../../components/permissionChecker';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';
import { Routes } from '../../../routes';

export default function Header() {
    const { translations: terminalesTranslations } = useTranslations({ group: translationsGroupNames.Terminales, keys: ['TalonariosTickets'] }); 
    const history = useHistory();

    const addClickHandler = () => {
        history.push(Routes.Terminales.Talonarios.Generar.path);
    };

    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
            <h4>{terminalesTranslations.TalonariosTickets}</h4>
        </div>
        <div className="d-block mb-4 mb-md-0">
            <Button hidden={!PermissionChecker(permissionsKeys.TERMINAL_TALONARIO_ADMINISTRAR)} type="button" onClick={addClickHandler}>
                <TranslatableText group={translationsGroupNames.Terminales} entry="GenerarTalonariosTickets" />
            </Button>
        </div>
        </div>
    );
}