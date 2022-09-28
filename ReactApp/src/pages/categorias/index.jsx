import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Modal } from '@themesberg/react-bootstrap';

import Manager from '../../components/manager';
import { TranslatableText } from '../../components/translations';
import { api as categorias, useDeleteMutation, useGetQuery as useGetUserQuery } from '../../redux/apis/categorias';
import withRedux from '../../redux/hoc/manager';

import Table from './table';
import Header from './header';
import { useState } from 'react';

const Categorias = ({ source, onQueryChange }) => {
  const { Id } = useParams();
  const history = useHistory();
  const { data: { EstadoId } = {} } = useGetUserQuery(Id, { skip: !!!Id });
  const [remove, { isSuccess: isDeleteSuccess, data: deleteData, isError: isDeleteError, error: deleteError }] = useDeleteMutation();
  const [isactivo, setIsActivo] = useState(true);

  const onSaveHandler = () => {
    remove(Id);
  };
  const onCancelHandler = () => {
    history.goBack();
  }

  useEffect(() => {
    if (isDeleteSuccess) {
      if(EstadoId == 1)
      {
      toast.success("Se elimino categoría con exito");
      }
      else{
        toast.success("Se activo categoría con exito");
      }
      history.goBack();
    }
    else if (isDeleteError) {
      const errors = [].concat(...Object.values(deleteError.data));
      toast.error(errors);
      history.goBack();
    }
  }, [isDeleteSuccess, deleteData, isDeleteError, deleteError]);

  useEffect(() => {
    if(EstadoId == 1){
      setIsActivo(false)
    }
  }, [EstadoId]);

  return (
    <>
      <Manager header={Header} entry={'Categorias'} table={Table} source={source} onQueryChange={onQueryChange} />
      <Modal show={!!Id} onHide={onCancelHandler} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
           {(!isactivo) && <TranslatableText entry="Eliminar" />}

           {(isactivo) && <TranslatableText entry="Activar" />}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(!isactivo) && <TranslatableText  entry="Confirmar Eliminacion" />}
        {(isactivo) && <TranslatableText  entry="Confirmar Activación" />}
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="outline-primary" onClick={onCancelHandler}>
            <TranslatableText  entry="Cancelar" />
          </Button>
          <Button type="button" className="ms-2" onClick={onSaveHandler}>
          {(!isactivo) && <TranslatableText  entry="Eliminar" />}          
          {(isactivo) && <TranslatableText  entry="Activar" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withRedux(categorias)(Categorias);