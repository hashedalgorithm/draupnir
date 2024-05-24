import { zodResolver } from '@hookform/resolvers/zod';
import { set, startCase } from 'lodash';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { AnyZodObject, ZodType, z } from 'zod';
import { Form } from '../components/ui/form';
import { TProperties, TProperty, TSchema } from '../types/schema';
import { FieldGenerator } from './field-generator';

type DraupnirProviderProps = PropsWithChildren<{
  schema: TSchema;
  onSubmit: (values: any) => Promise<void> | void;
  onChange?: (values: any) => void;
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
  className?: string;
}>;

const createSchema = (properties: TProperties) => {
  let masterSchema = z.object({} as Record<string, any>);

  Object.values(properties).forEach(property => {
    if (property.id.split('.').length === 1) {
      masterSchema = masterSchema.extend({
        [property.id]: createLeafZod(property),
      });
    } else {
      const toplevel = property.id.split('.').at(0);

      if (!toplevel) return masterSchema;

      masterSchema = masterSchema.extend({
        [toplevel]: createNestedSchema(
          masterSchema.shape?.[toplevel] ?? masterSchema,
          property.id
            .split('.')
            .filter(i => i !== toplevel)
            .join('.'),
          property
        ),
      });
    }
  });

  return masterSchema;
};

const createNestedSchema = (
  root: AnyZodObject,
  propertyId: string,
  property: TProperty
): ZodType => {
  const toplevel = propertyId.split('.').at(0);

  if (!toplevel) return root;

  let master = root.shape?.[toplevel] ?? root;

  if (propertyId.split('.').length === 1) {
    master = master.extend({
      [propertyId]: createLeafZod(property),
    });
  } else {
    master = master.extend({
      [toplevel]: createNestedSchema(
        master.shape?.[toplevel] ?? master,
        propertyId
          .split('.')
          .filter(i => i !== toplevel)
          .join('.'),
        property
      ),
    });
  }
  return master;
};

const createLeafZod = (property: TProperty): z.ZodType<any> => {
  switch (property.type) {
    case 'string':
      return addStringValidators(property);
    case 'number':
      return addNumberValidators(property);
    case 'boolean':
      return addBooleanValidators(property);
    default:
      return z.any();
  }
};

const addStringValidators = (property: TProperty) => {
  let zod = z.string({
    description: property?.helperText,
    invalid_type_error: `${startCase(
      property.label ?? property.id
    )} should be a string`,
    required_error: `${startCase(property.label ?? property.id)} is required!`,
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
};

const addNumberValidators = (property: TProperty) => {
  let zod = z.number({
    description: property?.helperText,
    invalid_type_error: `${startCase(
      property.label ?? property.id
    )} should be a number`,
    required_error: `${startCase(property.label ?? property.id)} is required!`,
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
};

const addBooleanValidators = (property: TProperty) => {
  let zod = z.boolean({
    description: property?.helperText,
    invalid_type_error: `${startCase(
      property.label ?? property.id
    )} should be a boolean`,
    required_error: `${startCase(property.label ?? property.id)} is required!`,
  });

  if (property?.readOnly) return zod.readonly();

  return zod;
};

const createRequiredSchema = (properties: TProperties) => {
  let required: Record<string, any> = {};
  Object.values(properties).forEach(property => {
    if (property?.required) {
      set(required, property.id, property.required);
    }
  });
  return required;
};

const DraupnirProvider = ({
  schema,
  children,
  onSubmit,
  ...props
}: DraupnirProviderProps) => {
  const zodSchema = useMemo(
    () =>
      createSchema(schema.properties).required(
        createRequiredSchema(schema.properties)
      ),
    [schema.properties]
  );

  const generateDefaultValues = (schema: TSchema) => {
    const defvals: Record<string, any> = {};

    Object.values(schema.properties).forEach(property => {
      if (property?.default) {
        set(defvals, property.id, property.default);
      }
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
