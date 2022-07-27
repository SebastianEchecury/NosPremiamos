import React, { Children, useEffect, useRef, useState } from "react";
import { Col, Form, Pagination, Row } from "@themesberg/react-bootstrap";
import PageSize from "./page-size";

const MAX_DISPLAYED_PAGES = 10;

export default ({ children, index = 0, length, onChange, className }) => {
  const currentPageInitialized = useRef(false);
  const [currentPage, setCurrentPage] = useState({ index: index, size: 10, displacement: 0 });
  const [pages, setPages] = useState({ from: 0, to: 0, length: 0 });
  const [values, setValues] = useState({ from: 0, to: 0 });

  const firstPageClickHandler = () => {
    setCurrentPage((previous) => ({ ...previous, index: 0, displacement: -previous.index }));
  };
  const previousPageClickHandler = () => {
    if (currentPage.index > 0) {
      setCurrentPage((previous) => ({ ...previous, index: previous.index - 1, displacement: -1 }));
    }
  };
  const pageClickHandler = (index) => {
    setCurrentPage((previous) => ({ ...previous, index: index }));
  };
  const nextPageClickHandler = () => {
    if (currentPage.index < pages.length - 1) {
      setCurrentPage((previous) => ({ ...previous, index: previous.index + 1, displacement: 1 }));
    }
  };
  const lastPageClickHandler = () => {
    setCurrentPage((previous) => ({ ...previous, index: pages.length - 1, displacement: pages.length - previous.index - 1 }));
  };
  const pageSizeChangeHandler = (event) => {
    const size = Number.parseInt(event.target.value);
    setCurrentPage((previous) => ({ ...previous, index: 0, size, displacement: 0 }));
  };

  useEffect(() => {
    setCurrentPage((previous) => ({ ...previous, index: index }));
  }, [index]);

  useEffect(() => {
    setPages((previous) => ({ ...previous, length: Math.ceil(length / currentPage.size) || 1 }));
  }, [length, currentPage.size]);

  useEffect(() => {
    setPages((previous) => {
      if (currentPage.index < previous.from || currentPage.index > previous.to) {
        if (currentPage.displacement < 0) {
          const from = currentPage.index;
          const to = from + MAX_DISPLAYED_PAGES - 1;

          return { ...previous, from, to };
        }
        else {
          const from = Math.max(currentPage.index - MAX_DISPLAYED_PAGES + 1, 0);
          const to = from + MAX_DISPLAYED_PAGES - 1;

          return { ...previous, from, to };
        }
      }

      return { ...previous };
    });
  }, [length, currentPage.index, currentPage.displacement]);

  useEffect(() => {
    const from = currentPage.index * currentPage.size;
    const to = Math.min(from + currentPage.size, length);

    setValues((previous) => ({ ...previous, from: from + 1, to }));
  }, [length, currentPage.index, currentPage.size]);

  useEffect(() => {
    if (currentPageInitialized.current) {
      onChange({ index: currentPage.index, size: currentPage.size });
    }
    else {
      currentPageInitialized.current = true;
    }
  }, [onChange, currentPage.index, currentPage.size]);

  return (
    <Row xs="auto" className={className}>
      <Col>
        <Pagination>
          <Pagination.First onClick={firstPageClickHandler} />
          <Pagination.Prev onClick={previousPageClickHandler} />
          {[...Array(Math.min(pages.length, MAX_DISPLAYED_PAGES)).keys()].map(index => index + pages.from).map(index => <Pagination.Item key={index} active={index === currentPage.index} onClick={() => pageClickHandler(index)}>{index + 1}</Pagination.Item>)}
          <Pagination.Next onClick={nextPageClickHandler} />
          <Pagination.Last onClick={lastPageClickHandler} />
        </Pagination>
      </Col>
      <Col xs="auto">
        <Form.Select onChange={pageSizeChangeHandler}>
          {Children.count(children) ? children : [10, 50, 100].map((size, index) => <PageSize key={index}>{size}</PageSize>)}
        </Form.Select>
      </Col>
      <Col>
        <Form.Control plaintext readOnly value={`${values.from}-${values.to} of ${length}`} ></Form.Control>
      </Col>
    </Row>
  );
};