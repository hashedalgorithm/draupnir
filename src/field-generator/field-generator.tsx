import { FieldManager } from '@/managers/field-manager';
import { WidgetManager } from '@/managers/widget-manager';
import { TProperties } from '@/types/schema';
import React from 'react';

type FieldGeneratorProps = {
  properties: TProperties;
  required: string[];
  readOnly: boolean;
  title: string;
};
const FieldGenerator = ({ properties, ...props }: FieldGeneratorProps) => {
  return (
    <>
      {Object.values(properties).map(property => {
        if (property.type !== 'object') {
          return property?.widget ? (
            <WidgetManager property={property} {...props} required={false} />
          ) : (
            <FieldManager property={property} {...props} required={false} />
          );
        } else
          return (
            <FieldGenerator
              key={`formfieldgenerator.subgenerator.${property.id}.${property.title}`}
              properties={properties}
              {...props}
            />
          );
      })}
    </>
  );
};

export { FieldGenerator };
