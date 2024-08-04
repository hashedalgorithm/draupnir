import { startCase } from 'lodash';
import React, { FC } from 'react';
import { FormLabel } from '../../components/ui/form';
import { TWidgetProps } from '../../types';

const LabelWidget: FC<TWidgetProps> = ({ property }) => (
  <FormLabel htmlFor={property.id}>
    <>
      {property?.label ?? startCase(property.id)}
      <span className="text-destructive font-sm mx-1">
        {property.required ? '*' : ''}
      </span>
    </>
  </FormLabel>
);

export { LabelWidget };
