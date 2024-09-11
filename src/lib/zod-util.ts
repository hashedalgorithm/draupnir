import { startCase, set, has, get } from 'lodash';
import { z, AnyZodObject, ZodType } from 'zod';
import { TProperties, TProperty, TSchema } from '../types';

export const createSchema = (properties: TProperties, catchAll: boolean) => {
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

  return catchAll
    ? masterSchema.catchall(z.union([z.string(), z.number(), z.boolean()]))
    : masterSchema;
};

export const createNestedSchema = (
  root: AnyZodObject,
  propertyId: string,
  property: TProperty
): ZodType => {
  const [toplevel, ...rest] = propertyId.split('.');

  if (rest.length === 0) {
    return root.extend({
      [toplevel]: createLeafZod(property),
    });
  }

  const existingSchema = root.shape?.[toplevel] ?? z.object({});

  return root.extend({
    [toplevel]: createNestedSchema(
      existingSchema as AnyZodObject,
      rest.join('.'),
      property
    ),
  });
};

export const createLeafZod = (property: TProperty): z.ZodType<any> => {
  switch (property.type) {
    case 'string':
      return addStringValidators(property);
    case 'number':
      return addNumberValidators(property);
    case 'boolean':
      return addBooleanValidators(property);
    case 'string-array':
      return addStringArrayValidators(property);
    default:
      return z.any();
  }
};

export const addStringValidators = (property: TProperty) => {
  let zod = z.string({
    description: property?.helperText,
    invalid_type_error: `${property.label ??
      startCase(property.id)} should be a string`,
    required_error: `${property.label ?? startCase(property.id)} is required!`,
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

  if (property?.minimum || property?.required)
    zod = zod.min(property.minimum ?? 1, {
      message: `Must be ${property.minimum ?? 1} or more characters long`,
    });
  return zod;
};

export const addStringArrayValidators = (property: TProperty) => {
  const str = z.string({
    description: property?.helperText,
    invalid_type_error: `${property.label ??
      startCase(property.id)} should be a string`,
    required_error: `${property.label ?? startCase(property.id)} is required!`,
  });

  let zod = z.array(str);

  if (property?.readOnly) return zod.readonly();

  if (property?.maximum)
    zod = zod.max(property.maximum, {
      message: `Must be ${property.maximum} or low items in the list`,
    });

  if (property?.minimum || property?.required)
    zod = zod.min(property.minimum ?? 1, {
      message: `Must be ${property.minimum ?? 1} or more items in the list`,
    });
  return zod;
};

export const addNumberValidators = (property: TProperty) => {
  let zod = z.number({
    description: property?.helperText,
    invalid_type_error: `${property.label ??
      startCase(property.id)} should be a number`,
    required_error: `${property.label ?? startCase(property.id)} is required!`,
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
    invalid_type_error: `${property.label ??
      startCase(property.id)} should be a boolean`,
    required_error: `${property.label ?? startCase(property.id)} is required!`,
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
  const defvals: Record<string, any> = {};

  filterNonReactiveProperties(schema.properties).forEach(property => {
    if (has(defaultValues, property.id)) {
      set(defvals, property.id, get(defaultValues, property.id));
    } else {
      set(
        defvals,
        property.id,
        property.type === 'string-array'
          ? property?.default ?? ([] as string[])
          : property?.default
      );
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
