import React from 'react';
import { TranslatableText } from '../../../../components/translations';
import { translationsGroupNames } from '../../../../utils/translationsGroupNames';

export default function Header() { 

  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="d-block mb-4 mb-md-0">
        <h4>
          <TranslatableText group={translationsGroupNames.Terminales} entry={'Tickets'} />
        </h4>
      </div>     
    </div>
  );
};