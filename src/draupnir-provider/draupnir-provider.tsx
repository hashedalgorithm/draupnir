import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ZodBoolean, ZodNumber, ZodString, z } from 'zod';
import { Form } from '../components/ui/form';
import { FieldGenerator } from '../field-generator';
import { TProperty, TSchema } from '../types/schema';
import { cn } from '../lib/tw-util';

type DraupnirProviderProps = {
  schema: TSchema;
  onSubmit: (values: any) => Promise<void> | void;
  onChange?: (values: any) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  className?: string;
};
const DraupnirProvider = ({ schema, ...props }: DraupnirProviderProps) => {
  const addStringValidators = useCallback(
    (zod: ZodString, property: TProperty) => {
      if (property.maximum)
        zod.max(property.maximum, {
          message: `Must be ${property.maximum} or low characters long `,
        });
      if (property.minimum)
        zod?.min(property.minimum, {
          message: `Must be ${property.minimum} or more characters long`,
        });
      if (property.default && typeof property.default === 'string')
        zod.default(property.default);
      if (property?.widget === 'email')
        zod.email({
          message: `"Invalid email address"`,
        });
      if (property?.widget === 'url') zod.url({ message: 'Invalid URL' });
      return zod;
    },
    []
  );
  const addNumberValidators = useCallback(
    (zod: ZodNumber, property: TProperty) => {
      if (property.maximum && Object.keys(zod).includes('max'))
        zod.max(property.maximum, {
          message: `Must be ${property.maximum} or low characters long `,
        });
      if (property.minimum)
        zod?.min(property.minimum, {
          message: `Must be ${property.minimum} or more characters long`,
        });
      if (property.default && typeof property.default === 'number')
        zod.default(property.default);
      return zod;
    },
    []
  );
  const addBooleanValidators = useCallback(
    (zod: ZodBoolean, property: TProperty) => {
      if (property.default && typeof property.default === 'boolean')
        zod.default(property.default);
      return zod;
    },
    []
  );

  const zodSchema = useMemo(() => {
    const zods: Record<string, z.ZodType<any>> = {};
    for (const key in schema.properties) {
      if (Object.prototype.hasOwnProperty.call(schema.properties, key)) {
        switch (schema.properties[key].type) {
          case 'string':
            zods[key] = addStringValidators(
              z.string({
                description: schema.properties[key]?.helperText,
                invalid_type_error: `${schema.properties[key].label ??
                  key} should be a string`,
                required_error: `${schema.properties[key].label ??
                  key} is required!`,
              }),
              schema.properties[key] as TProperty
            );
            break;
          case 'number':
            zods[key] = addNumberValidators(
              z.number({
                description: schema.properties[key]?.helperText,
                invalid_type_error: `${schema.properties[key].label ??
                  key} should be a number`,
                required_error: `${schema.properties[key].label ??
                  key} is required!`,
              }),
              schema.properties[key] as TProperty
            );
            break;
          case 'boolean':
            zods[key] = addBooleanValidators(
              z.boolean({
                description: schema.properties[key]?.helperText,
                invalid_type_error: `${schema.properties[key].label ??
                  key} should be a boolean`,
                required_error: `${schema.properties[key].label ??
                  key} is required!`,
              }),
              schema.properties[key] as TProperty
            );
            break;
          default:
            zods[key] = z.any();
        }
      }
    }
    return z.object(zods);
  }, [addStringValidators, schema.properties]);

  const formProps = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    mode: props.mode,
  });

  useEffect(() => {
    if (props?.onChange && typeof props.onChange === 'function') {
      props.onChange(formProps.formState);
    }
  }, [formProps.formState]);

  return (
    <Form {...formProps}>
      <form
        onSubmit={formProps.handleSubmit(props.onSubmit)}
        className={cn('space-y-8', props?.className)}
      >
        <FieldGenerator
          key={`root.fieldgenerator.${schema.title.toLowerCase()}`}
          properties={schema.properties}
        />
      </form>
    </Form>
  );
};

export { DraupnirProvider };
