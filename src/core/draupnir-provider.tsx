import { zodResolver } from '@hookform/resolvers/zod';
import { startCase } from 'lodash';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../components/ui/form';
import { TProperty, TSchema } from '../types/schema';
import { FieldGenerator } from './field-generator';

type DraupnirProviderProps = PropsWithChildren<{
  schema: TSchema;
  onSubmit: (values: any) => Promise<void> | void;
  onChange?: (values: any) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  className?: string;
  defaultValues?: any;
}>;
const DraupnirProvider = ({
  schema,
  children,
  onSubmit,
  defaultValues,
  ...props
}: DraupnirProviderProps) => {
  const addStringValidators = useCallback(
    (property: TProperty) => {
      let zod = z.string({
        description: property?.helperText,
        invalid_type_error: `${startCase(
          property.label ?? property.id
        )} should be a string`,
        required_error: `${startCase(
          property.label ?? property.id
        )} is required!`,
      });

      if (property?.readOnly) return zod.readonly();

      if (property?.widget === 'email')
        return zod.email({
          message: `"Invalid email address"`,
        });

      if (property?.widget === 'url')
        return zod.url({ message: 'Invalid URL' });

      if (property.maximum)
        zod = zod.max(property.maximum, {
          message: `Must be ${property.maximum} or low characters long `,
        });

      if (property.minimum)
        zod = zod.min(property.minimum, {
          message: `Must be ${property.minimum} or more characters long`,
        });

      return zod;
    },
    [startCase, z]
  );

  const addNumberValidators = useCallback(
    (property: TProperty) => {
      let zod = z.number({
        description: property?.helperText,
        invalid_type_error: `${startCase(
          property.label ?? property.id
        )} should be a number`,
        required_error: `${startCase(
          property.label ?? property.id
        )} is required!`,
      });

      if (property?.readOnly) return zod.readonly();

      if (property?.required)
        zod = zod.min(0, {
          message: `${startCase(property?.label ?? property.id)} is required!`,
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
    },
    [startCase, z]
  );
  const addBooleanValidators = useCallback(
    (property: TProperty) => {
      let zod = z.boolean({
        description: property?.helperText,
        invalid_type_error: `${startCase(
          property.label ?? property.id
        )} should be a boolean`,
        required_error: `${startCase(
          property.label ?? property.id
        )} is required!`,
      });

      if (property?.readOnly) return zod.readonly();

      return zod;
    },
    [startCase, z]
  );

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
  }, [
    addStringValidators,
    addNumberValidators,
    addBooleanValidators,
    schema.properties,
  ]);

  const generateDefaultValues = (schema: TSchema) => {
    if (defaultValues) return defaultValues;
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
