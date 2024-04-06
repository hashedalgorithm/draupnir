import { FC } from 'react';
import { TProperty, TPropertyType, TWidgetType } from './schema';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';

export type TWidgetProps<T = unknown> = T & {
  property: TProperty;
  className?: string;
  field?: ControllerRenderProps<FieldValues, string>;
  fieldState?: ControllerFieldState;
  formState?: UseFormStateReturn<FieldValues>;
};

export type TWidgetBase = {
  [K in TPropertyType]?: FC<TWidgetProps>;
};

export type TWidgetCustom = {
  [K in Exclude<TWidgetType, 'separator' | 'heading'>]?: FC<TWidgetProps>;
};

export type TWidgetNonReactive = {
  [K in Extract<TWidgetType, 'separator' | 'heading'>]?: FC<TWidgetProps>;
};

export type TWidget = {
  base: TWidgetBase;
  custom: TWidgetCustom;
  nonreactive: TWidgetNonReactive;
};
