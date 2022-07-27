import React from 'react'

import { Header, OptionMenu, SortDescription, SortForm, Table as TecsoTable, TextFilterDescription, TextFilterForm } from '../../../components/table';
import { TranslatableText } from '../../../components/translations';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

import Row from './row';

export default function Table(props) {
    return (
        <TecsoTable {...props} row={(props) => <Row {...props} />}>
            <Header className="d-flex">
                <TranslatableText group={translationsGroupNames.Terminales} entry="NombreRepresentante" />
                <SortDescription className="ms-2" conditions={(order) => ({ nombre: order })} />
                <TextFilterDescription className="ms-2" conditions={(value) => ({ nombre: value })} />
                <OptionMenu className="ms-auto">
                    <SortForm conditions={(order) => ({ nombre: order })} />
                    <TextFilterForm conditions={(value) => ({ nombre: value })} />
                </OptionMenu>
            </Header>
            <Header className="d-flex">
                <TranslatableText group={translationsGroupNames.Terminales} entry="ApellidoRepresentante" />
                <SortDescription className="ms-2" conditions={(order) => ({ apellido: order })} />
                <TextFilterDescription className="ms-2" conditions={(value) => ({ apellido: value })} />
                <OptionMenu className="ms-auto">
                    <SortForm conditions={(order) => ({ apellido: order })} />
                    <TextFilterForm conditions={(value) => ({ apellido: value })} />
                </OptionMenu>
            </Header>
            <Header className="d-flex">
                <TranslatableText group={translationsGroupNames.Terminales} entry="TalonariosTicketsId" />
                <SortDescription className="ms-2" conditions={(order) => ({ terminalTalonarioTicketId: order })} />
                <TextFilterDescription className="ms-2" conditions={(value) => ({ terminalTalonarioTicketId: value })} />
                <OptionMenu className="ms-auto">
                    <SortForm conditions={(order) => ({ terminalTalonarioTicketId: order })} />
                    <TextFilterForm conditions={(value) => ({ terminalTalonarioTicketId: value })} />
                </OptionMenu>
            </Header>
            <Header className="d-flex">
                <TranslatableText group={translationsGroupNames.Terminales} entry="IdTicket" />
                <SortDescription className="ms-2" conditions={(order) => ({ ticketId: order })} />
                <TextFilterDescription className="ms-2" conditions={(value) => ({ ticketId: value })} />
                <OptionMenu className="ms-auto">
                    <SortForm conditions={(order) => ({ ticketId: order })} />
                    <TextFilterForm conditions={(value) => ({ ticketId: value })} />
                </OptionMenu>
            </Header>
            <Header className="d-flex">
                <TranslatableText group={translationsGroupNames.Terminales} entry="EstadoTicket" />
                <SortDescription className="ms-2" conditions={(order) => ({ ticketEstado: order })} />
                <TextFilterDescription className="ms-2" conditions={(value) => ({ ticketEstado: value })} />
                <OptionMenu className="ms-auto">
                    <SortForm conditions={(order) => ({ ticketEstado: order })} />
                    <TextFilterForm conditions={(value) => ({ ticketEstado: value })} />
                </OptionMenu>
            </Header>
            <Header className="d-flex">
                <TranslatableText group={translationsGroupNames.Terminales} entry="EstadoCupo" />
                <SortDescription className="ms-2" conditions={(order) => ({ cupoEstado: order })} />
                <TextFilterDescription className="ms-2" conditions={(value) => ({ cupoEstado: value })} />
                <OptionMenu className="ms-auto">
                    <SortForm conditions={(order) => ({ cupoEstado: order })} />
                    <TextFilterForm conditions={(value) => ({ cupoEstado: value })} />
                </OptionMenu>
            </Header>
            <Header className="d-flex">
                <TranslatableText group={translationsGroupNames.Generic} entry="FechaDesde" />
                <SortDescription className="ms-2" conditions={(order) => ({ fechaDesde: order })} />
                <TextFilterDescription className="ms-2" conditions={(value) => ({ fechaDesde: value })} />
                <OptionMenu className="ms-auto">
                    <SortForm conditions={(order) => ({ fechaDesde: order })} />
                    <TextFilterForm conditions={(value) => ({ fechaDesde: value })} />
                </OptionMenu>
            </Header>
            <Header className="d-flex">
                <TranslatableText group={translationsGroupNames.Generic} entry="FechaHasta" />
                <SortDescription className="ms-2" conditions={(order) => ({ fechaHasta: order })} />
                <TextFilterDescription className="ms-2" conditions={(value) => ({ fechaHasta: value })} />
                <OptionMenu className="ms-auto">
                    <SortForm conditions={(order) => ({ fechaHasta: order })} />
                    <TextFilterForm conditions={(value) => ({ fechaHasta: value })} />
                </OptionMenu>
            </Header>
        </TecsoTable>
    );
}
