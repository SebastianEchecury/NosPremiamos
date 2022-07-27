import React, { Children, cloneElement, isValidElement, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { Button, Overlay, Popover } from "@themesberg/react-bootstrap";

export default ({ children, className, filter = {}, onFilterChange = (filter) => { }, order = [], onOrderChange = (order) => { } }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleToggleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const handleHide = () => {
    setShow(false);
  };
  const handleFilterChange = (filter) => {
    setShow(false);
    onFilterChange(filter);
  };
  const handleOrderChange = (order) => {
    setShow(false);
    onOrderChange(order);
  };

  return (
    <div ref={ref} className={className}>
      <Button variant="link" className="p-0" onClick={handleToggleClick}>
        <FontAwesomeIcon icon={faAngleDoubleDown} />
      </Button>
      <Overlay show={show} target={target} placement="bottom" container={ref} rootClose={true} onHide={handleHide}>
        <Popover id="popover-basic">
          <Popover.Content>
            {Children.map(children, (child, index) => {
              if (isValidElement(child)) {
                if (index > 0) {
                  return (
                    <>
                      <hr />
                      {cloneElement(child, { filter, onFilterChange: handleFilterChange, order, onOrderChange: handleOrderChange })}
                    </>
                  );
                }
                else {
                  return cloneElement(child, { filter, onFilterChange: handleFilterChange, order, onOrderChange: handleOrderChange });
                }
              }
            })}
          </Popover.Content>
        </Popover>
      </Overlay>
    </div >
  );
};