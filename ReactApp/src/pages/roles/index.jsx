import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Modal } from '@themesberg/react-bootstrap';

import Manager from '../../components/manager';
import { TranslatableText } from '../../components/translations';
import { api as roles, useDeleteMutation } from '../../redux/apis/roles';
import withRedux from '../../redux/hoc/manager';

import Table from './table';
import Header from './header';
import { translationsGroupNames } from '../../utils/translationsGroupNames';

const Roles = ({ source, onQueryChange }) => {
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
    }
  }, [isDeleteSuccess, deleteData, isDeleteError, deleteError]);

  return (
    <>
      <Manager header={Header} table={Table} source={source} onQueryChange={onQueryChange} />
      <Modal show={!!id} onHide={onCancelHandler} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <TranslatableText group={translationsGroupNames.Generic} entry="Delete" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TranslatableText group={translationsGroupNames.Confirmations} entry="DeleteConfirmation" />
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="outline-primary" onClick={onCancelHandler}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
          </Button>
          <Button type="button" className="ms-2" onClick={onSaveHandler}>
            <TranslatableText group={translationsGroupNames.Generic} entry="Save" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withRedux(roles)(Roles);