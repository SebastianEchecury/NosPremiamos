import React from "react";
import { Button, Modal } from "@themesberg/react-bootstrap";

import { TranslatableText } from "./translations";
import { translationsGroupNames } from "../utils/translationsGroupNames";

export default function DeleteModalForm({ show, value, onClose = () => { }, onSubmit = (values) => { } }) {
  const cancelHandler = () => {
    onClose();
  };

  const saveHandler = () => {
    onSubmit(value);
  };

  return (
    <Modal show={show} onHide={cancelHandler} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <TranslatableText group={translationsGroupNames.Generic} entry="Delete" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TranslatableText group={translationsGroupNames.Confirmations} entry="DeleteConfirmation" />
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="outline-primary" onClick={cancelHandler}>
          <TranslatableText group={translationsGroupNames.Generic} entry="Cancel" />
        </Button>
        <Button type="button" className="ms-2" onClick={saveHandler}>
          <TranslatableText group={translationsGroupNames.Generic} entry="Save" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}