import React from 'react';
import { TSchema } from '../types';
import { FieldGenerator } from './field-generator';

type DraupnirInstanceFormFieldProps = {
  schema: TSchema;
};
const DraupnirInstanceFormFields = ({
  schema,
}: DraupnirInstanceFormFieldProps) => {
  return (
    <FieldGenerator
      key={`root.fieldgenerator.${schema.title.toLowerCase()}`}
      properties={schema.properties}
      conditions={schema.conditions}
    />
  );
};

export default DraupnirInstanceFormFields;
