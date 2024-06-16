import React, { PropsWithChildren } from 'react';
import { Form } from 'react-hook-form';
import { TSchema } from '../types';
import { useDraupnirInstanceContext } from './draupnir-instance-provider';
import { FieldGenerator } from './field-generator';

type DraupnirInstanceProps = PropsWithChildren<{
  onSubmit: (values: unknown) => Promise<void> | void;
  className?: string;
  schema: TSchema;
}>;

const DraupnirForm = ({
  children,
  onSubmit,
  className,
  schema,
}: DraupnirInstanceProps) => {
  const { formProps } = useDraupnirInstanceContext();

  if (!formProps) return <></>;

  return (
    <Form key={`draupnirform.${schema.title}.${schema.version}`} {...formProps}>
      <form onSubmit={formProps.handleSubmit(onSubmit)} className={className}>
        <FieldGenerator
          key={`root.fieldgenerator.${schema.title.toLowerCase()}`}
          properties={schema.properties}
          conditions={schema.conditions}
        />
        {children}
      </form>
    </Form>
  );
};

export { DraupnirForm };
