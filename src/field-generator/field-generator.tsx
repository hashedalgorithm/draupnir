import React from 'react';
import { FieldManager, WidgetManager } from '../managers';
import { TProperties } from '../types/schema';

type FieldGeneratorProps = {
  properties: TProperties;
};
const FieldGenerator = ({ properties, ...props }: FieldGeneratorProps) => {
  return (
    <>
      {Object.values(properties).map(property => {
        return property?.widget ? (
          <WidgetManager property={property} {...props} />
        ) : (
          <FieldManager property={property} {...props} />
        );
      })}
    </>
  );
};

export { FieldGenerator };
