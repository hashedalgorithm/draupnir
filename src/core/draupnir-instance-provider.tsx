import { zodResolver } from '@hookform/resolvers/zod';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
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

type ProviderState = {
  formProps: UseFormReturn | null;
};

const RawContext = createContext<ProviderState>({
  formProps: null,
});

const useDraupnirInstanceContext = () => useContext(RawContext);

const DraupnirInstanceProvider = ({
  schema,
  children,
  defaultValues,
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

  return (
    <RawContext.Provider value={{ formProps }}>
      <>{children}</>
    </RawContext.Provider>
  );
};

export { DraupnirInstanceProvider, useDraupnirInstanceContext };
