import React from 'react';
import { TCondition, TProperties } from '../types/schema';
import { FieldManager, WidgetManager } from './managers';

type FieldGeneratorProps = {
  properties: TProperties;
  conditions: TCondition[];
};

const FieldGenerator = ({ properties, conditions }: FieldGeneratorProps) => {
  const checkIfPropertyIsInvolvedInCondition = (propertyId: string) => {
    const filteredCondition = conditions.filter(
      condition =>
        condition.then.includes(propertyId) ||
        (condition.type === 'ifelse' && condition?.else.includes(propertyId))
    );
    return filteredCondition?.at(0);
  };
  return (
    <>
      {Object.values(properties).map(property => {
        return property?.widget ? (
          <WidgetManager
            key={`fieldgenerator.property.widgetmanager.${property.id}`}
            property={property}
            condition={checkIfPropertyIsInvolvedInCondition(property.id)}
          />
        ) : (
          <FieldManager
            key={`fieldgenerator.property.fieldmanager.${property.id}`}
            property={property}
            condition={checkIfPropertyIsInvolvedInCondition(property.id)}
          />
        );
      })}
    </>
  );
};

export { FieldGenerator };
