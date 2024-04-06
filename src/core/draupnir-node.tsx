import React, { FC } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
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
      render={({ field, fieldState, formState }) => (
        <FormItem>
          {property.type !== 'boolean' && <FormLabel>{field.name}</FormLabel>}
          <FormControl>
            <Widget
              property={property}
              field={field}
              fieldState={fieldState}
              formState={formState}
            />
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
