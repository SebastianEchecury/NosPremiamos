import React from "react";

import { useGetHeaderQuery } from '../../redux/apis/users';

import Representante from "./representante";
import Terminal from "./terminal";

export default () => {
  const { data: header = {} } = useGetHeaderQuery();

  return (
    <div className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
      {header.representante?.id && <Representante id={header.representante.id} />}
      {header.terminal?.id && <Terminal id={header.terminal.id} />}
    </div>
  );
};
