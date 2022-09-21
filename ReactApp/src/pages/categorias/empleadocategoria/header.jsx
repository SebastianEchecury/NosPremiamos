import React, {useState} from 'react';
import { Button, Form } from '@themesberg/react-bootstrap';
import { TranslatableText } from '../../../components/translations';
import { permissionsKeys } from '../../../utils/permissionsKeys';
import PermissionChecker from '../../../components/permissionChecker';
import Modal from 'react-bootstrap/Modal';
import { useEmpleadosRepresentantesQuery as useGetRepresentantesItemsQuery} from '../../../redux/apis/users';
import {useAddMutation} from '../../../redux/apis/empleadoscategorias'
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';

export default function Header() { 
    const history = useHistory();
    const [show, setShow] = useState(false);
    const { data: representantes = [] } = useGetRepresentantesItemsQuery();
    const [add, { isSuccess: isAddSuccess, data: addData, isError: isAddError, error: addError }] = useAddMutation();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      representante: {id :0 },

    }});

    const onSaveHandler = () => {
        var regex = /(\d+)/g; 
        add({EmpleadoId: formik.values.representante.id, CategoriaId: history.location.pathname.match(regex)[0]} );
      };

  return (
      <>
    <Button hidden={!PermissionChecker(permissionsKeys.CATEGORIA_ADD)} type="button" onClick={handleShow}>
    <TranslatableText  entry={'Agregar'} />
  </Button>
  <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Aprobadores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Select {...formik.getFieldProps('representante.id')} isInvalid={!!formik.errors.representante?.id}>
                <option value="0">Seleccione un empleado</option>
                {representantes?.DataObject?.map((representante) => (<option key={representante.Id} value={`${representante.Id}`}>{representante.Descripcion}</option>))}
        </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
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