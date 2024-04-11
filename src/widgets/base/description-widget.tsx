import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { FormDescription } from '../../components/ui/form';

const DescriptionWidget: FC<TWidgetProps> = ({ property }) => (
  <FormDescription>{property.helperText}</FormDescription>
);

export { DescriptionWidget };
