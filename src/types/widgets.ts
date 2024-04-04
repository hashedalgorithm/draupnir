import { FC } from 'react';
import { TProperty, TPropertyType, TWidgetType } from './schema';

export type TWidgetProps = {
  property: TProperty;
  required: boolean;
  readOnly: boolean;
  title: string;
};

export type TWidgetBase = {
  [K in TPropertyType]: FC<TWidgetProps>;
};

export type TWidgetAdvance = {
  [K in Exclude<TWidgetType, 'separator' | 'heading'>]: FC<TWidgetProps>;
};

export type TWidgetNonReactive = {
  [K in Extract<TWidgetType, 'separator' | 'heading'>]: FC<TWidgetProps>;
};

export type TWidget = {
  base: TWidgetBase;
  custom: TWidgetAdvance;
  nonreactive: TWidgetNonReactive;
};
