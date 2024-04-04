import { FieldGenerator } from '@/field-generator/field-generator';
import { TSchema } from '@/types/schema';
import React from 'react';
import { DraupnirRoot } from '@/draupnir-root';

type DraupnirProviderProps = {
  schema: TSchema;
} & React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
const DraupnirProvider = ({ schema, ...props }: DraupnirProviderProps) => {
  return (
    <DraupnirRoot widgets={null}>
      <form {...props}>
        <FieldGenerator
          key={`root.fieldgenerator.${schema.id}.${schema.title}`}
          properties={schema.properties}
          readOnly={schema.readOnly ?? false}
          required={schema.required}
          title={schema.title}
        />
      </form>
    </DraupnirRoot>
  );
};

export { DraupnirProvider };
