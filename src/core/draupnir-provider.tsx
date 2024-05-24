import { zodResolver } from '@hookform/resolvers/zod';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { FormState, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../components/ui/form';
import {
  createRequiredSchema,
  createSchema,
  generateDefaultValues,
} from '../lib';
import { TSchema } from '../types/schema';
import { FieldGenerator } from './field-generator';

type DraupnirProviderProps = PropsWithChildren<{
  schema: TSchema;
  onSubmit: (values: any) => Promise<void> | void;
  onChange?: (values: any) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  className?: string;
  defaultValues?: Record<string, any>;
  getFormState?: (state: FormState<any>) => void;
}>;

const DraupnirProvider = ({
  schema,
  children,
  onSubmit,
  defaultValues,
  getFormState,
  ...props
}: DraupnirProviderProps) => {
  const zodSchema = useMemo(
    () =>
      createSchema(schema.properties).required(
        createRequiredSchema(schema.properties)
      ),
    [schema.properties]
  );

  const formProps = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: generateDefaultValues(schema, defaultValues ?? {}),
    mode: props.mode,
  });

  useEffect(() => {
    const subscription = formProps.watch((value: Record<string, any>) => {
      if (props?.onChange && typeof props.onChange === 'function') {
        props.onChange(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [formProps.watch]);

  return (
    <Form key={`draupnirform.${schema.title}.${schema.version}`} {...formProps}>
      <form
        onSubmit={formProps.handleSubmit(onSubmit)}
        className={props?.className}
      >
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

export { DraupnirProvider };
