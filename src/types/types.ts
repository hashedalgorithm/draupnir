export type TSchema = {
  title: string;
  version?: string;
  id?: string;
  readOnly?: boolean;
  properties: TProperties;
  required: string[];
  conditions: TCondition[];
};

export type TPropertyType = 'string' | 'number' | 'boolean';
export type TWidget = 'dropdown' | 'checkbox' | 'radio' | 'datepicker' | 'text';

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

export type TProperties<T extends string = string> = Record<
  T,
  TProperty | TSchema
>;

export type TProperty = {
  id: string;
  type: TPropertyType;
  widget?: TWidget;
  maximum?: number;
  minimum?: number;
  placeholder?: string;
  default?: string | number | boolean;
  pattern?: string;
  view?: TView;
  enum?: string[];
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
