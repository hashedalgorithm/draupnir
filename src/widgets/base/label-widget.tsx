import { sentenceCase } from 'change-case';
import React, { FC } from 'react';
import { FormLabel } from '../../components/ui/form';
import { TWidgetProps } from '../../types';

const LabelWidget: FC<TWidgetProps> = ({ property }) => (
  <FormLabel htmlFor={property.id}>
    {property?.label ?? sentenceCase(property.id)}
  </FormLabel>
);

export { LabelWidget };
