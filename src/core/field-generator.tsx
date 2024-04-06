import React from 'react';
import { FieldManager, WidgetManager } from './managers';
import { TProperties } from '../types/schema';

type FieldGeneratorProps = {
  properties: TProperties;
};
const FieldGenerator = ({ properties }: FieldGeneratorProps) => {
  return (
    <>
      {Object.values(properties).map(property => {
        return property?.widget ? (
          <WidgetManager
            key={`fieldgenerator.property.widgetmanager.${property.id}`}
            property={property}
          />
        ) : (
          <FieldManager
            key={`fieldgenerator.property.fieldmanager.${property.id}`}
            property={property}
          />
        );
      })}
    </>
  );
};

export { FieldGenerator };
