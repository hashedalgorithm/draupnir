import { startCase } from 'lodash';
import React, { FC } from 'react';
import { FormLabel } from '../../components/ui/form';
import { TWidgetProps } from '../../types';

const LabelWidget: FC<TWidgetProps> = ({ property }) => (
  <FormLabel htmlFor={property.id}>
    {property?.label ?? startCase(property.id)}
  </FormLabel>
);

export { LabelWidget };
