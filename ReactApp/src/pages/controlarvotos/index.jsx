import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Modal, Form } from '@themesberg/react-bootstrap';
import { useFormik } from 'formik';

import Manager from '../../components/manager';
import { TranslatableText } from '../../components/translations';
import { api as votos,  useGetQuery as useGetUserQuery, useUpdateMutation } from '../../redux/apis/votos';
import withRedux from '../../redux/hoc/manager';
import * as Yup from 'yup';

import Table from './table';
import Header from './header';
import { useState } from 'react';

const Votos = ({ source, onQueryChange }) => {
  const { Id } = useParams();
  const history = useHistory();
  const IdUser = JSON.parse(localStorage.getItem('usuario')).id
  const [update, { isSuccess: isUpdateSuccess, data: updateData, isError: isUpdateError, error: updateError }] = useUpdateMutation();
  const [isactivo, setIsActivo] = useState(true);
  const { data: { VotadoEmpleadoId, VotanteEmpleadoId, FechaVoto,  CategoriaId, Motivo,  MotivoRechazo } = {} } = useGetUserQuery(Id, { skip: !!!Id });

  const onSaveHandler = () => {
    if(history.location.pathname.includes('update')){
       update({Id:Id,VotadoEmpleadoId:VotadoEmpleadoId , VotanteEmpleadoId: VotanteEmpleadoId, FechaVoto: FechaVoto, AprobadorEmpleadoId: IdUser , CategoriaId: CategoriaId, Motivo: Motivo, Aprobado: true});
    }
    else{
        update({Id:Id, VotadoEmpleadoId:VotadoEmpleadoId , VotanteEmpleadoId: VotanteEmpleadoId, FechaVoto: FechaVoto, AprobadorEmpleadoId: IdUser , CategoriaId: CategoriaId, Motivo: Motivo, MotivoRechazo: formik.values.MotivoRechazo, Aprobado: false});
    }
    
  };
  const onCancelHandler = () => {
    history.goBack();
  }

  useEffect(() => {
    if (isUpdateSuccess) {
        if(history.location.pathname.includes('update')){
            toast.success("Se aprobo voto con exito");      
        }
        else{
            toast.success("Se rechazo voto con exito");
        }
      history.goBack();
    }
    else if (isUpdateError) {
        toast.error([].concat(...Object.values(JSON.parse(updateError.data).Messages)));
      history.goBack();
    }
  }, [isUpdateSuccess, updateData, isUpdateError, updateError]);

  useEffect(() => {
    if(history.location.pathname.includes('update')){
      setIsActivo(false)
    }
  }, [history.location.pathname]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      MotivoRechazo: MotivoRechazo || '',

    },
    validationSchema: Yup.object().shape({       
      MotivoRechazo: Yup.string().required('Debe ingresar motivo'),
    }),
});


  return (
    <>
      <Manager header={Header}  entry={'Votos a Controlar'} table={Table} source={source} onQueryChange={onQueryChange} />
      <Modal show={!!Id} onHide={onCancelHandler} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
           {(!isactivo) && <TranslatableText entry="Aprobar voto" />}

           {(isactivo) && <TranslatableText entry="Rechazar voto" />}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(!isactivo) && <TranslatableText  entry="Confirmar aprobar voto" />}
        {(isactivo) &&<Form.Group className="mb-3">
              <Form.Label>
                <TranslatableText  entry="Motivo de Rechazo" />*
              </Form.Label>
              <Form.Control type="text"  {...formik.getFieldProps('MotivoRechazo')} isInvalid={!!formik.errors.MotivoRechazo && formik.touched.MotivoRechazo} />
              <Form.Control.Feedback type="invalid">{formik.errors.MotivoRechazo}</Form.Control.Feedback>
            </Form.Group>}
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="outline-primary" onClick={onCancelHandler}>
            <TranslatableText  entry="Cancelar" />
          </Button>
          <Button type="button" className="ms-2" onClick={onSaveHandler}>
          {(!isactivo) && <TranslatableText  entry="Aprobar" />}          
          {(isactivo) && <TranslatableText  entry="Rechazar" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withRedux(votos)(Votos);