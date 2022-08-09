import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Modal } from '@themesberg/react-bootstrap';

import Manager from '../../components/manager';
import { TranslatableText } from '../../components/translations';
import { api as users, useDeleteMutation } from '../../redux/apis/users';
import withRedux from '../../redux/hoc/manager';

import Table from './table';
import Header from './header';

const Users = ({ source, onQueryChange }) => {
  const { id } = useParams();
  const history = useHistory();
  const [remove, { isSuccess: isDeleteSuccess, data: deleteData, isError: isDeleteError, error: deleteError }] = useDeleteMutation();

  const onSaveHandler = () => {
    remove(id);
  };
  const onCancelHandler = () => {
    history.goBack();
  }

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData.message);
      history.goBack();
    }
    else if (isDeleteError) {
      const errors = [].concat(...Object.values(deleteError.data));
      toast.error(errors);
      history.goBack();
    }
  }, [isDeleteSuccess, deleteData, isDeleteError, deleteError]);

  return (
    <>
      <Manager header={Header} table={Table} source={source} onQueryChange={onQueryChange} />
      <Modal show={!!id} onHide={onCancelHandler} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <TranslatableText entry="Eliminar" />
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
            <TranslatableText  entry="Guardar" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withRedux(users)(Users);