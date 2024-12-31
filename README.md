# Draupnir 🪄

![draupnir](https://github.com/hashedalgorithm/draupnir/assets/53309069/da55b4b6-0f06-4d3c-8ca3-0d718ef0ccef)

Draupnir is a dynamic form generator for React applications, designed to streamline the process of creating forms based on JSON Schema. Unlike some existing libraries, Draupnir prioritizes flexibility and customization, empowering developers to tailor the form renderer to their specific needs.

### Features

- **📋 Render Forms with JSON**: Draupnir enables the rendering of forms dynamically based on JSON schema definitions.
- **🎨 Conditional Rendering**: Developers can conditionally render form elements based on specific criteria using Draupnir.
- **🛠️ Customizable Components**: Draupnir provides developers with the flexibility to customize form components according to their requirements.
- **⚡ Built Upon React Hook Forms for Performance**: Leveraging React Hook Forms, Draupnir ensures optimal performance and efficiency in form rendering.
- **🔒 Data Validations Using Zod**: Draupnir integrates Zod for robust data validations, ensuring data integrity and consistency.
- **❗ Clear Error Messages**: Draupnir offers specific and clear error messages for various data validation scenarios, including minimum/maximum values, required fields, and improper data types. Developers can also provide custom error messages.
- **🥳 Supports App Router(Nextjs 13 and above)**: It supports out of the box for Nextjs both pages and app router now. Every non interative component(lable, description etc) is a server component and reactive components are client components.

### Limitations

- **🚫 Single Condition per Field**: Draupnir currently supports applying only one condition per field, limiting the complexity of conditional rendering scenarios.

**Table of Contents**

## Installation

NPM :

```bash
npm install draupnir
```

Yarn :

```bash
yarn add draupnir
```

## Basic Usage

Using Draupnir is straightforward. Simply provide your JSON Schema to the form generator, along with any customizations for the form renderer.

```typescript
// Define your JSON Schema
const schema = {
  // Your Schema here
};

// Initialize Widgets Object. This object contains the renderes.
const widgets = {
  base: {
    string: StringWidget,
    // If you want use your own custom form components add this as needed
  },
  nonreactive: {},
  custom: {},
};

const handleOnSubmit = async (val: any) => {
  console.log(val);
  // your onsubmit logic here
};

// Render the form
const App = () => (
  <DraupnirRoot widgets={widgets}>
    <DraupnirInstanceProvider
      schema={schema}
      mode={'onChange'} // Controls when validations should run, onChange, onBlur, all, onSubmit
      defaultValues={{}} // Override your default Values
    >
      // you can have children. This children will be outside the <form> element context
      <DraupnirForm schema={schema} onSubmit={handleOnSubmit}>
          <>
            // you can extend the form with form action button here. this is inside <form> element context
            <button type="submit">Sumit</button>
            <button type="button">Cancel</button>
          </>
      </DraupnirForm>
      <FormSection /> // some other extra contents that needs to access formstate.
    </DraupnirInstanceProvider>
    // you can add any number of instances inside draupnir root and they all their respective formstates. If you want different widgets then wrap it under new DraupnirRoot providing the desired custom widgets.
  </DraupnirRoot>
);

export default App;
```

```typescript
const FormSection = () => {
  const { formState } = useDraupnirInstanceContext();

  useEffect(() => {
    const subscription = formProps.watch((value: Record<string, any>) => {
      //do your thing with values
      //contains form values such as values, errors, isdirty, formstate, fieldstate etc
    });
    return () => subscription.unsubscribe();
  }, [formProps.watch]);
  return <div>Form Section that contains input elements!</div>;
};
```

## Example Schema

```typescript
  const schema = {
    title: "Sample",
    version: "0.1",
    conditions: [
      {
        type: "if",
        id: 'age',
        match: 18,
        operator: "lesser_or_equal",
        then: ['hasVoterId']
      },
      {
        type: "select_injection",
        id: "gender",
        match: "male",
        mode: "replace",
        then: "weight",
        enum: ['less than 90', '90 - 100', '100 -120', '120 - 130'],
      }
    ],
    properties: {
      title: {
        id: "title",
        type: "string",
        widget: "heading",
        hlevel: "h2",
        label: "Personal Details Form"
      },
      fullname: {
        id: "fullname",
        type: "string",
        label: "Full Name",
        maximum: 20,
        minimum: 5,
        view: {
          lg: 12,
          xl: 4,
          xxl: 4,
          wide: 4
        }
      },
      age: {
        id: "age",
        type: "number",
        maximum: 50,
        minimum: 0
      },
      hasVoterId: {
        id: "hasVoterId",
        type: 'boolean',
        label: "Do you have Voter ID (Provided by your Respected Governtment)",
        helperText: "If you have applied and waiting for issue, then please choose 'yes'."
      },
      gender: {
        id: "gender",
        type: "string",
        widget: 'select',
        enum: ['male', 'female', "others"],
        default: "male"
      },
      weight: {
        id: "weight",
        type: "string",
        widget: 'select',
        enum: ['Lesser than 50', '55 - 60', "60 - 80"],
      },
      height: {
        id: "height",
        type: "string",
        widget: 'select',
        label: "Height (CM)",
        enum: ['lesser than 150', '150 - 170', "Greater than 170"],
        default: "lesser than 150"
      },
      isAgree: {
        id: "isAgree",
        type: "boolean",
        required: true
      },
      separator: {
        id: "separator",
        type: "string",
        widget: "separator"
      }
    },
  } satisfies TSchema;
```

# Explanation of Schema

Link to Types : https://github.com/hashedalgorithm/draupnir/blob/main/src/types/schema.ts

## TSchema

```typescript
type TSchema = {
  title: string;
  version?: string;
  readOnly?: boolean;
  properties: TProperties;
  conditions: TCondition[];
  meta?: Record<string, string>;
  catchAll?: boolean;
};
```

- **title**: _Required._ A string representing the title of the schema.
- **version**: Optional. A string representing the version of the schema.
- **readOnly**: Optional. Indicates whether the schema is read-only.
- **properties**: _Required._ An object containing the properties of the schema. It is of type `TProperties`.
- **conditions**: _Required._ An array containing conditions to be applied to the schema. It is of type `TCondition[]`.
- **meta**: Optional. You can have property specific custom meta data and can access it in your custom widgets or logics. It is of type Record<string, string>`.
- **catchAll**: Optional. You can have catch all properties that you passing in custom children section in form by settting this flag to true. be default it is set to false`.

These keys provide essential information and configuration options for defining a schema within Draupnir, ensuring flexibility and customization in form generation.

## TProperties

- Represents the properties/field of a schema.
- It is a recod of field configurations.

## TProperty

The `TProperty` type represents a property/form field within a schema. Each property can have various configuration options that can alter behaviour, validations of that respective field:

- **id**: _Required._ Unique identifier for the property and it also serves as the name. if you want to want have field inside deep levels then use dot notation here. eg. 'address.streetno' results data as

```typescript
...
properties: {
  address.streetno: {
    id: "address.streetno"
  }
}
```

```typescript
{
  address: {
    streetno: 123;
  }
}
```

- **id**: _Required._ A unique identifier for the property.
- **type**: _Required._ Type of the property. It can be one of string literals: 'string', 'number', 'string-array' or 'boolean'.
- **widget**: Optional. Type of widget to be used for rendering the field (It can be one of literals: 'select', 'checkbox-group', 'checkbox', 'radio', 'email', 'url', 'datepicker', 'text', 'separator', 'heading').
- **maximum**: Optional. Maximum value allowed for the property (applicable for number, string type).
- **minimum**: Optional. Minimum value allowed for the property (applicable for number, string type).
- **placeholder**: Optional. Placeholder text for the field (applicable for string, number, widgets: select, datepicker, email, url, text).
- **label**: Optional. Label text for the field.
- **helperText**: Optional. Helper text to provide additional guidance for the field.
- **required**: Optional. Indicates whether the field is required.
- **readOnly**: Optional. Indicates whether the field is read-only.
- **errorText**: Optional. Custom Error message to display when validation fails.
- **default**: Optional. Default value for the field It can be one of types: 'string', 'number', 'string[]', or 'boolean'.
- **pattern**: Optional. Regular expression pattern for validating the field value.
- **view**: Optional. Configuration for the view of the property, including size settings for different breakpoints.
- **position**: Optional. Defines the position of the property in the form (in terms of row).

Note
If the minimum property is not specified and the required property is set to true, the field will automatically be validated with a minimum length of 1. This behavior applies exclusively to fields of string or string array types.

In other words, when a string or string array is marked as required, the system will enforce that the field must contain at least one character or one element, respectively, unless a custom minimum value is explicitly provided.

Screen Breakpoints

```typescript
  sm: { max: '600px' },
  md: { min: '601px', max: '767px' },
  lg: { min: '768px', max: '991px' },
  xl: { min: '992px', max: '1199px' },
  xxl: { min: '1200px', max: '1500px' },
  wide: { min: '1500px' },
```

It includes optional sizes for different breakpoints: 'sm', 'md', 'lg', 'xl', 'xxl', and 'wide'. The whole container is a grid of 12 columns and you can configure how much cols each field occupies here.

Example:

```typescript
{
  id: "fullname",
  type: "string",
  label: "Full Name",
  view: {
    lg: 12,
    xl: 4,
    xxl: 4,
    wide: 4
  }
}
```

Default field span
| Breakpoint | Default Span size |
|------------|------|
| sm | 12 |
| md | 12 |
| lg | 12 |
| xl | 6 |
| xxl | 6 |
| wide | 6 |

- **disabled**: Optional. Indicates whether the field is disabled.
- **enum**: Optional. Enumeration of possible values for the field. This is exclusive fields using widget for select, checkbox-group and radio.
  Enums

```typescript
  type TEnums = Array<TEnum | string>;

  type TEnum = {
    label: string;
    value: string;
    disabled?: boolean;
  };

  {
    enum: ['option1', 'option2', 'option3', ... n number of options that to be rendered.] // for just want to get the job done.
    ...other properties
  }

  //For more control
  {
    enum: [
      { lable: "Option 1", value: "option1" },
      { lable: "Option 2", value: "option2" },
      { lable: "Option 3", value: "option2", disabled: true },
      ...n number of options that to be rendered.
    ]
  }
```

Note: It is Recommended to maintain uniformity by using either string or TEnum for your enum elements when there is conditions involved like select_injection.

Refer the example in the start of documentation for more context. The example showcases the usage of the enums as string[] uniformly throughtout the conditions and properties section.

- **hlevel**: Optional. Exculsive field for field using heading widget. Specifies the heading level for heading widget. Possible values: `'h1'`, `'h2'`, `'h3'`, `'h4'`, `'h5'`, `'h6'`.
- **step**: Optional. Exclusive for number inputs. Specifies the step value for numeric inputs.
- **meta**: Optional. You can have property specific custom meta data and can access it in your custom widgets or logics.

```typescript
  {
    meta: {
      userId: 'USR-123',
      accountId: 'ACC-456'
    },
    ...other properties
  }
```

These keys provide comprehensive options for configuring fields within a schema, ensuring flexibility and customization in form generation.

## Field Type and Widget Type

To achieve the desired behavior for form fields, it's essential to use the appropriate types with specific widgets as per the guidelines.By adhering to these recommendations and using the appropriate widget types for each property type, you can ensure that the form behaves as expected, providing a smooth and intuitive user experience.

☑️ - This denotes this combition is supported
❌ - This reults in not-supported/inconsistent behaviour
🙅‍♂️ - This denotes the widget is still under work in progress
😏 - This will work. but not recommended.

### Field Type string

| Widget Type    | Renderer                       |
| -------------- | ------------------------------ |
| NA             | Input ☑️                       |
| select         | Select/Dropdown ☑️             |
| checkbox       | Checkbox ❌                    |
| checkbox-group | Checkbox Group                 |
| radio          | Radio Group ☑️                 |
| email          | Input with Email Validation ☑️ |
| url            | Input with URL Validation ☑️   |
| datepicker     | Datepicker 🙅‍♂️                  |
| text           | TextArea ☑️                    |
| separator      | Separator/Divider 😏           |
| heading        | Heading 😏                     |

### Field Type number

| Widget Type    | Renderer                       |
| -------------- | ------------------------------ |
| NA             | Number Input ☑️                |
| select         | Select/Dropdown ❌             |
| checkbox       | Checbox ❌                     |
| checkbox-group | Checkbox Group ❌              |
| radio          | Radio Group ❌                 |
| email          | Input with Email Validation ❌ |
| url            | Input with URL Validation ❌   |
| datepicker     | Datepicker ❌                  |
| text           | TextArea ❌                    |
| separator      | Separator/Divider 😏           |
| heading        | Heading 😏                     |

### Field Type boolean

| Widget Type    | Renderer                       |
| -------------- | ------------------------------ |
| NA             | Switch ☑️                      |
| select         | Select/Dropdown ❌             |
| checkbox       | Checkbox ☑️                    |
| checkbox-group | Checkbox Group ❌              |
| radio          | Radio Group ❌                 |
| email          | Input with Email Validation ❌ |
| url            | Input with URL Validation ❌   |
| datepicker     | Datepicker ❌                  |
| text           | TextArea ❌                    |
| separator      | Separator/Divider 😏           |
| heading        | Heading 😏                     |

### Field Type string-array

| Widget Type    | Renderer                       |
| -------------- | ------------------------------ |
| NA             | React Fragment                 |
| select         | Select/Dropdown ❌             |
| checkbox       | Checkbox ❌                    |
| checkbox-group | Checkbox Group ☑️              |
| radio          | Radio Group ❌                 |
| email          | Input with Email Validation ❌ |
| url            | Input with URL Validation ❌   |
| datepicker     | Datepicker ❌                  |
| text           | TextArea ❌                    |
| separator      | Separator/Divider 😏           |
| heading        | Heading 😏                     |

### Field Type none

| Widget Type    | Renderer                       |
| -------------- | ------------------------------ |
| NA             | React Fragment                 |
| select         | Select/Dropdown ❌             |
| checkbox       | Checkbox ❌                    |
| checkbox-group | Checkbox Group ❌              |
| radio          | Radio Group ❌                 |
| email          | Input with Email Validation ❌ |
| url            | Input with URL Validation ❌   |
| datepicker     | Datepicker ❌                  |
| text           | TextArea ❌                    |
| separator      | Separator/Divider ☑️           |
| heading        | Heading ☑️                     |

## TCondition

The `TCondition` type represents a condition to be applied to the field:

```typescript
type TCondition =
  | {
      type: 'if';
      id: string;
      match: string | number | boolean;
      operator: TConditionOperator;
      then: string[];
    }
  | {
      type: 'ifelse';
      id: string;
      match: string | number | boolean;
      operator: TConditionOperator;
      then: string[];
      else: string[];
    }
  | {
      type: 'select_injection';
      mode: 'replace' | 'add' | 'remove';
      id: string;
      match: string;
      then: string;
      enum: TEnums;
    };
```

- **type**: _Required._ Specifies the type of condition. It can be one of:
  - _'if'_: Specifies a condition to be met for certain actions to be taken.
  - _'ifelse'_: Specifies a condition to be met for certain actions to be taken, with an alternative action if the condition is not met.
  - _'select_injection'_: Specifies a condition for injecting options into a select widget based on a match.
- **id**: _Required._ Unique identifier for the field to which the condition is applied.
- **match**: _Required._ Value to match against in the condition. It can be a string, number, or boolean.
- **operator**: _Required._ The operator to apply in the condition. It is of type `TConditionOperator`.
- **then**: _Required._ Array of fieldIds to render if the condition is met.
- **else**: Optional. Array of fieldIds to render if the condition is not met (applicable only for 'ifelse' type).
- **enum**: Optional. Enum array of strings injected to target select if conditions are met. (Only applicable for type 'select_inject')
- **mode**: _Required_. Mode of injection of enum to target select. (Only applicable for type 'select_inject')

These keys provide a flexible mechanism for defining conditional logic within schemas, enabling dynamic behavior based on specified conditions.

## TConditionOperator

- Represents operators used in conditions.
- It can be one of: 'greater', 'lesser', 'greater_or_equal', 'lesser_or_equal', 'equal', or 'not_equal'.

## Issues

If you encounter any bugs or have suggestions for improvements, please [open an issue](https://github.com/hashedalgorithm/draupnir/issues).

## Contributing

Contributions are welcome! Please refer to the [contribution guidelines](https://github.com/hashedalgorithm/draupnir/contributing) before getting started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
