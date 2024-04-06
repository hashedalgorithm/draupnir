import React, { FC } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useFormContext } from 'react-hook-form';
import { TProperty, TWidgetProps } from '../types';

type DraupnirNodeProps = {
  property: TProperty;
  widget: FC<TWidgetProps>;
};
const DraupnirNode = ({ property, widget: Widget }: DraupnirNodeProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={property?.location ?? property.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{property?.label ?? property.id}</FormLabel>
          <FormControl>
            <Widget property={property} />
          </FormControl>
          {property?.helperText && (
            <FormDescription>{property.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DraupnirNode;
