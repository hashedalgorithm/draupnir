import { FC } from 'react';
import { TProperty, TPropertyType, TWidgetType } from './schema';

export type TWidgetProps<T = unknown> = T & {
  property: TProperty;
  className?: string;
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
