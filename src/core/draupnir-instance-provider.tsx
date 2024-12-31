'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { PropsWithChildren, useMemo } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import {
  createRequiredSchema,
  createSchema,
  generateDefaultValues,
} from '../lib';
import { TSchema } from '../types/schema';

type DraupnirProviderProps = PropsWithChildren<{
  schema: TSchema;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  className?: string;
  defaultValues?: Record<string, any>;
}>;

const useDraupnirInstanceContext = () => useFormContext();

const DraupnirInstanceProvider = ({
  schema,
  children,
  defaultValues,
  ...props
}: DraupnirProviderProps) => {
  const zodSchema = useMemo(
    () =>
      createSchema(schema.properties, schema.catchAll ?? false).required(
        createRequiredSchema(schema.properties)
      ),
    [schema.properties]
  );

  const formProps = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: generateDefaultValues(schema, defaultValues ?? {}),
    mode: props.mode,
  });

  return <FormProvider {...formProps}>{children}</FormProvider>;
};

export { DraupnirInstanceProvider, useDraupnirInstanceContext };
