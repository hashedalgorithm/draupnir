export type TSchema = {
  title: string;
  version?: string;
  readOnly?: boolean;
  properties: TProperties;
  conditions: TCondition[];
  meta?: Record<string, string>;
  catchAll?: boolean;
};

export type TPropertyType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'none'
  | 'string-array';
export type TWidgetType =
  | 'select'
  | 'checkbox'
  | 'checkbox-group'
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
  default?: string | number | boolean | string[];
  pattern?: string;
  view?: TView;
  disabled?: boolean;
  enum?: TEnums;
  hlevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  step?: number;
  meta?: Record<string, string>;
  visible?: boolean;
  position?: number;
};

export type TEnums = Array<TEnum | string>;

export type TEnum = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type TConditionOperator =
  | 'greater'
  | 'lesser'
  | 'greater_or_equal'
  | 'lesser_or_equal'
  | 'equal'
  | 'not_equal';

export type TCondition =
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
