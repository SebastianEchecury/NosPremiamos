import React from 'react';
import Manager from '../../../components/manager';
import { api as empleadosRepresentantes, useDeleteMutation } from '../../../redux/apis/empleadoscategorias';
import withRedux from '../../../redux/hoc/manager';
import { Button, Form } from '@themesberg/react-bootstrap';
import { TranslatableText } from '../../../components/translations';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';
import Table from './table';
import Header from './header';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


const EmpleadosRepresentantes = ({ source, onQueryChange }) => {
    const history = useHistory();
    const [Delete, { isSuccess: isDeleteSuccess, data: deleteData, isError: isDeleteError, error: deleteError }] = useDeleteMutation();

    const onSaveHandler = () => {
        var regex = /(\d+)/g; 
        Delete(history.location.pathname.match(regex)[0]);
      };

    const onCancelHandler = () => {
        history.goBack();
     };

     useEffect(() => {
        if (isDeleteSuccess) {
          toast.success("Se elimino aprobador con exito");
          history.goBack();
        }
        else if (isDeleteError) {
          toast.error([].concat(...Object.values(JSON.parse(deleteError.data).Messages)));
          history.goBack();
        }
      }, [isDeleteSuccess, deleteData, isDeleteError, deleteError]);

  return (
      <>
    <Manager header={Header} entry={'Aprobadores'} table={Table} source={source} onQueryChange={onQueryChange} />
    <Modal show={history.location.pathname.includes('empleadoscategorias')} onHide={onCancelHandler} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
           <TranslatableText entry="Eliminar Aprobador" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TranslatableText  entry="Confirmar Eliminacion" />
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="outline-primary" onClick={onCancelHandler}>
            <TranslatableText  entry="Cancelar" />
          </Button>
          <Button type="button" className="ms-2" onClick={onSaveHandler}>
           <TranslatableText  entry="Eliminar" />
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
};

export default withRedux(empleadosRepresentantes)(EmpleadosRepresentantes);