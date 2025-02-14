'use client';

import React, { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';
import { TSchema } from '../types';
import { FieldGenerator } from './field-generator';

type DraupnirInstanceProps = PropsWithChildren<{
  onSubmit: (values: unknown) => Promise<void> | void;
  onError?: (errors: unknown) => Promise<void> | void;
  className?: string;
  schema: TSchema;
}>;

const DraupnirForm = ({
  children,
  onSubmit,
  onError,
  className,
  schema,
}: DraupnirInstanceProps) => {
  const formProps = useFormContext();

  return (
    <form
      onSubmit={formProps.handleSubmit(onSubmit, onError)}
      className={className}
    >
      <FieldGenerator
        key={`root.fieldgenerator.${schema.title.toLowerCase()}`}
        properties={schema.properties}
        conditions={schema.conditions}
      />
      {children}
    </form>
  );
};

export { DraupnirForm };
