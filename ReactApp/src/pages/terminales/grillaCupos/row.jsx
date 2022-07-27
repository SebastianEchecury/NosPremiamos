import React from 'react';
import { DateTime } from "luxon";

import { Cell, Row as TecsoRow } from '../../../components/table';

export default function Row({ value, index, values }) {

    return (
        <TecsoRow>
            <Cell>{value.representante.firstName}</Cell>
            <Cell>{value.representante.lastName}</Cell>
            <Cell>{value.terminalTalonarioTicketId}</Cell>
            <Cell>{value.terminalTalonarioTicket.numero}</Cell>
            <Cell>{value.terminalTalonarioTicket.estadoTicket.nombre}</Cell>
            <Cell>{value.estadoCupo.nombre}</Cell>
            <Cell>{DateTime.fromISO(value.fechaDesde).toFormat('dd/MM/yyyy')}</Cell>
            <Cell>{DateTime.fromISO(value.fechaHasta).toFormat('dd/MM/yyyy')}</Cell>
        </TecsoRow>
    );
}