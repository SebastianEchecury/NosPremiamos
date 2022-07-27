import React from "react";
import { useFormik } from "formik";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "@themesberg/react-bootstrap";
import { TranslatableText } from "../../../translations";

import { translationsGroupNames } from "../../../../utils/translationsGroupNames";

export default function SelectFilterForm({ filter = {}, value: getValue, conditions: getConditions = (value) => ({}), onFilterChange = (filter) => { }, options = [] }) {
  getValue = getValue || ((filter) => {
    const conditions = getConditions();
    const key = Object.keys(conditions)[0];
    return filter[key];
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { value: getValue(filter) },
    onSubmit: ({ value }) => {
      const conditions = getConditions(value);
      onFilterChange({ ...filter, ...conditions });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Select {...formik.getFieldProps('value')}>
          {options.map((option) => (<option key={option.value || ''} value={option.value}>{option.description}</option>))}
        </Form.Select>
      </Form.Group>
      <Button type="submit">
        <FontAwesomeIcon icon={faSearch} className="mx-1" />
        <TranslatableText group={translationsGroupNames.Generic} entry="Search" />
      </Button>
    </Form>
  );
}