import React from 'react';
import { FieldGenerator } from '../field-generator';
import { TSchema } from '../types/schema';

type DraupnirProviderProps = {
  schema: TSchema;
} & React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
const DraupnirProvider = ({ schema, ...props }: DraupnirProviderProps) => {
  return (
    <form {...props}>
      <FieldGenerator
        key={`root.fieldgenerator.${schema.id}.${schema.title}`}
        properties={schema.properties}
        readOnly={schema.readOnly ?? false}
        required={schema.required}
        title={schema.title}
      />
    </form>
  );
};

export { DraupnirProvider };
