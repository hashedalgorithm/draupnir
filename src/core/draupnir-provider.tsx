import { zodResolver } from '@hookform/resolvers/zod';
import { sentenceCase } from 'change-case';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../components/ui/form';
import { cn } from '../lib/tw-util';
import { TProperty, TSchema } from '../types/schema';
import { FieldGenerator } from './field-generator';

type DraupnirProviderProps = PropsWithChildren<{
  schema: TSchema;
  onSubmit: (values: any) => Promise<void> | void;
  onChange?: (values: any) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  className?: string;
}>;
const DraupnirProvider = ({
  schema,
  children,
  onSubmit,
  ...props
}: DraupnirProviderProps) => {
  const addStringValidators = useCallback((property: TProperty) => {
    let zod = z.string({
      description: property?.helperText,
      invalid_type_error: `${property.label ?? property.id} should be a string`,
      required_error: `${property.label ?? property.id} is required!`,
    });

    if (property?.readOnly) return zod.readonly();

    if (property?.widget === 'email')
      return zod.email({
        message: `"Invalid email address"`,
      });

    if (property?.widget === 'url') return zod.url({ message: 'Invalid URL' });

    if (property.maximum)
      zod = zod.max(property.maximum, {
        message: `Must be ${property.maximum} or low characters long `,
      });

    if (property.minimum)
      zod = zod.min(property.minimum, {
        message: `Must be ${property.minimum} or more characters long`,
      });

    return zod;
  }, []);

  const addNumberValidators = useCallback((property: TProperty) => {
    let zod = z.number({
      description: property?.helperText,
      invalid_type_error: `${property.label ?? property.id} should be a number`,
      required_error: `${property.label ?? property.id} is required!`,
    });

    if (property?.readOnly) return zod.readonly();

    if (property?.required)
      zod = zod.min(0, {
        message: `${sentenceCase(property?.label ?? property.id)} is required!`,
      });

    if (property.maximum)
      zod = zod.max(property.maximum, {
        message: `Must be ${property.maximum} or low characters long `,
      });

    if (property.minimum)
      zod = zod?.min(property.minimum, {
        message: `Must be ${property.minimum} or more characters long`,
      });

    return zod;
  }, []);
  const addBooleanValidators = useCallback((property: TProperty) => {
    let zod = z.boolean({
      description: property?.helperText,
      invalid_type_error: `${property.label ?? property} should be a boolean`,
      required_error: `${property.label ?? property} is required!`,
    });

    if (property?.readOnly) return zod.readonly();

    return zod;
  }, []);

  const zodSchema = useMemo(() => {
    const zods: Record<string, z.ZodType<any>> = {};
    const zodRequired: Record<string, any> = {};
    for (const key in schema.properties) {
      if (Object.prototype.hasOwnProperty.call(schema.properties, key)) {
        switch (schema.properties[key].type) {
          case 'string':
            {
              zods[key] = addStringValidators(schema.properties[key]);
              zodRequired[key] = !!schema.properties[key]?.required;
            }
            break;
          case 'number':
            {
              zods[key] = addNumberValidators(schema.properties[key]);
              zodRequired[key] = !!schema.properties[key]?.required;
            }
            break;
          case 'boolean':
            {
              zods[key] = addBooleanValidators(schema.properties[key]);
              zodRequired[key] = !!schema.properties[key]?.required;
            }
            break;
          default:
            zods[key] = z.any();
        }
      }
    }
    return z.object(zods).required(zodRequired);
  }, [addStringValidators, schema.properties]);

  const generateDefaultValues = (schema: TSchema) => {
    const defvals: Record<string, any> = {};

    Object.values(schema.properties).forEach(property => {
      defvals[property.id] = property?.default ?? undefined;
    });
    return defvals;
  };

  const formProps = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: generateDefaultValues(schema),
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
    <Form {...formProps}>
      <form
        onSubmit={formProps.handleSubmit(onSubmit)}
        className={cn('space-y-3', props?.className)}
      >
        <FieldGenerator
          key={`root.fieldgenerator.${schema.title.toLowerCase()}`}
          properties={schema.properties}
        />
        {children}
      </form>
    </Form>
  );
};

export { DraupnirProvider };
