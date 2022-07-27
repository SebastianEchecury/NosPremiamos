import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, Modal } from '@themesberg/react-bootstrap';

import Manager from '../../../components/manager';
import { TranslatableText } from '../../../components/translations';
import { api as terminales, useDeleteMutation } from '../../../redux/apis/terminales';
import withRedux from '../../../redux/hoc/manager';

import Table from './table';
import Header from './header';
import { translationsGroupNames } from '../../../utils/translationsGroupNames';

const Terminales = ({ source, onQueryChange }) => {
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
        else if (isDeleteError)
        {
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
            <Button type="button" onClick={onSaveHandler}>
                <TranslatableText group={translationsGroupNames.Generic} entry="Save" />
            </Button>
            <Button type="button" onClick={onCancelHandler}>
                <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default withRedux(terminales)(Terminales);