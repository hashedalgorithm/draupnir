export type TSchema = {
  title: string;
  version?: string;
  readOnly?: boolean;
  properties: TProperties;
  conditions: TCondition[];
};

export type TPropertyType = 'string' | 'number' | 'boolean';
export type TWidgetType =
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'email'
  | 'url'
  | 'datepicker'
  | 'text'
  | 'separator'
  | 'heading';

export type TSizeSm = 1 | 2 | 3 | 4 | 5 | 6;
export type TSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type TView = {
  sm?: TSizeSm;
  md?: TSize;
  lg?: TSize;
  xl?: TSize;
  xxl?: TSize;
  wide?: TSize;
};

export type TProperties<T extends string = string> = Record<T, TProperty>;

export type TProperty = {
  id: string;
  type: TPropertyType;
  widget?: TWidgetType;
  maximum?: number;
  minimum?: number;
  placeholder?: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  readOnly?: boolean;
  errorText?: string;
  default?: string | number | boolean;
  pattern?: string;
  view?: TView;
  disabled?: boolean;
  enum?: string[];
  hlevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  step?: number;
};

export type TCondition = {
  if?: TConditionIf;
  then?: string[];
  else?: string[];
};

export type TConditionIf = {
  id: string;
  match: string | number | boolean;
};
