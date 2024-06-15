import { startCase, set } from 'lodash';
import { z, AnyZodObject, ZodType } from 'zod';
import { TProperties, TProperty, TSchema } from '../types';

export const createSchema = (properties: TProperties) => {
  let masterSchema = z.object({} as Record<string, any>);

  filterNonReactiveProperties(properties).forEach(property => {
    if (property.id.split('.').length === 1) {
      masterSchema = masterSchema.extend({
        [property.id]: createLeafZod(property),
      });
    } else {
      const toplevel = property.id.split('.').at(0);

      if (!toplevel) return;

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

export const createNestedSchema = (
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

export const createLeafZod = (property: TProperty): z.ZodType<any> => {
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

export const addStringValidators = (property: TProperty) => {
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

export const addNumberValidators = (property: TProperty) => {
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

export const addBooleanValidators = (property: TProperty) => {
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

export const createRequiredSchema = (properties: TProperties) => {
  let required: Record<string, any> = {};
  filterNonReactiveProperties(properties).forEach(property => {
    if (property?.required) {
      set(required, property.id, property.required);
    }
  });
  return required;
};

export const generateDefaultValues = (
  schema: TSchema,
  defaultValues: Record<string, any>
) => {
  if (defaultValues) return defaultValues;
  const defvals: Record<string, any> = {};

  filterNonReactiveProperties(schema.properties).forEach(property => {
    if (property?.default) {
      set(defvals, property.id, property.default);
    }
  });
  return defvals;
};

export const filterNonReactiveProperties = (properties: TProperties) =>
  Object.values(properties).filter(
    property =>
      property.type !== 'none' &&
      property?.widget !== 'separator' &&
      property?.widget !== 'heading'
  );
