import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "@themesberg/react-bootstrap";
import toast from 'react-hot-toast';

import { TranslatableText } from "../../../../components/translations";
import PermissionChecker from '../../../../components/permissionChecker';

import { useAddMutation as useCargarPantenteMutation, useDeleteMutation as useDeletePantenteMutation, useGetListQuery as useGetPatentesListQuery } from "../../../../redux/apis/representante-patentes";
import { translationsGroupNames } from "../../../../utils/translationsGroupNames";
import { permissionsKeys } from "../../../../utils/permissionsKeys";

import Patente from "./patente";
import CargaPatenteModalForm from "./carga-patente-modal-form";
import DeleteModalForm from "../../../../components/delete-modal-form";

export default function Pantentes({ id }) {
  const [cargarPatente, { isSuccess: isCargarPatenteSuccess, data: cargarPatenteData, isError: isCargarPatenteError, error: cargarPatenteError }] = useCargarPantenteMutation();
  const [deletePatente, { isSuccess: isDeletePatenteSuccess, data: deletePatenteData, isError: isDeletePatenteError, error: deletePatenteError }] = useDeletePantenteMutation();
  const { data: patentes = {} } = useGetPatentesListQuery({ filter: { representanteId: id }, order: [{ patente: 'asc' }] });
  const [cargaPatenteProps, setCargaPatenteProps] = useState({ show: false, errors: [] });
  const [deletePatenteProps, setDeletePatenteProps] = useState({ show: false, value: undefined });

  const cargaPatenteButtonClickHandler = () => {
    setCargaPatenteProps({ show: true, errors: [] });
  };
  const cargaPatenteModalFormCloseHandler = () => {
    setCargaPatenteProps((previous) => ({ ...previous, show: false }));
  };
  const cargaPatenteModalFormSubmitHandler = ({ patente }) => {
    cargarPatente({ patente });
  };

  const deletePatenteHandler = (value) => {
    setDeletePatenteProps({ show: true, value });
  };
  const deletePatenteModalFormCloseHandler = () => {
    setDeletePatenteProps((previous) => ({ ...previous, show: false }));
  };
  const deletePatenteModalFormSubmitHandler = ({ id }) => {
    deletePatente(id);
  };

  useEffect(() => {
    if (isCargarPatenteSuccess) {
      toast.success(cargarPatenteData.message);
      setCargaPatenteProps({ show: false, errors: [] });
    }
  }, [isCargarPatenteSuccess, cargarPatenteData]);

  useEffect(() => {
    if (isCargarPatenteError) {
      toast.error([].concat(...Object.values(cargarPatenteError.data)));
      setCargaPatenteProps((previous) => ({ ...previous, errors: cargarPatenteError.data }))
    }
  }, [isCargarPatenteError, cargarPatenteError]);

  useEffect(() => {
    if (isDeletePatenteSuccess) {
      toast.success(deletePatenteData.message);
      setDeletePatenteProps({ show: false, value: undefined });
    }
  }, [isDeletePatenteSuccess, deletePatenteData]);

  useEffect(() => {
    if (isDeletePatenteError) {
      toast.error([].concat(...Object.values(deletePatenteError.data)));
    }
  }, [isDeletePatenteError, deletePatenteError]);

  return (
    <>
      <Card>
        <Card.Body>
          <Row className="align-items-center">
            <Col xs="auto">
              <Card.Title>
                <TranslatableText group={translationsGroupNames.Representantes} entry="Patentes" />
              </Card.Title>
            </Col>
            <Col className="text-end">
              <Button hidden={!PermissionChecker(permissionsKeys.REPRESENTANTE_PATENTE_ADD)} type="button" onClick={cargaPatenteButtonClickHandler}>
                <TranslatableText group={translationsGroupNames.Generic} entry="Create" />
              </Button>
            </Col>
          </Row>
          <div className="mt-2">
            {(patentes.data || []).map((patente) => (<Patente key={patente.id} value={patente} onDelete={deletePatenteHandler} />))}
          </div>
        </Card.Body>
      </Card>
      <CargaPatenteModalForm show={cargaPatenteProps.show} errors={cargaPatenteProps.errors} onClose={cargaPatenteModalFormCloseHandler} onSubmit={cargaPatenteModalFormSubmitHandler} />
      <DeleteModalForm show={deletePatenteProps.show} value={deletePatenteProps.value} onClose={deletePatenteModalFormCloseHandler} onSubmit={deletePatenteModalFormSubmitHandler} />
    </>
  );
}