import React, { FC } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { useFormContext } from 'react-hook-form';
import { TProperty, TWidgetProps } from '../types';
import { sentenceCase } from 'change-case';
import { cn } from '../lib/tw-util';
import { cva } from 'class-variance-authority';

type DraupnirNodeProps = {
  property: TProperty;
  widget: FC<TWidgetProps>;
  className?: string;
};
type TSize =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

const size = cva('space-y-1', {
  variants: {
    sm: {
      '1': 'sm:col-span-1',
      '2': 'sm:col-span-2',
      '3': 'sm:col-span-3',
      '4': 'sm:col-span-4',
      '5': 'sm:col-span-5',
      '6': 'sm:col-span-6',
      '7': 'sm:col-span-7',
      '8': 'sm:col-span-8',
      '9': 'sm:col-span-9',
      '10': 'sm:col-span-10',
      '11': 'sm:col-span-11',
      '12': 'sm:col-span-12',
    },
    md: {
      '1': 'md:col-span-1',
      '2': 'md:col-span-2',
      '3': 'md:col-span-3',
      '4': 'md:col-span-4',
      '5': 'md:col-span-5',
      '6': 'md:col-span-6',
      '7': 'md:col-span-7',
      '8': 'md:col-span-8',
      '9': 'md:col-span-9',
      '10': 'md:col-span-10',
      '11': 'md:col-span-11',
      '12': 'md:col-span-12',
    },
    lg: {
      '1': 'lg:col-span-1',
      '2': 'lg:col-span-2',
      '3': 'lg:col-span-3',
      '4': 'lg:col-span-4',
      '5': 'lg:col-span-5',
      '6': 'lg:col-span-6',
      '7': 'lg:col-span-7',
      '8': 'lg:col-span-8',
      '9': 'lg:col-span-9',
      '10': 'lg:col-span-10',
      '11': 'lg:col-span-11',
      '12': 'lg:col-span-12',
    },
    xl: {
      '1': 'xl:col-span-1',
      '2': 'xl:col-span-2',
      '3': 'xl:col-span-3',
      '4': 'xl:col-span-4',
      '5': 'xl:col-span-5',
      '6': 'xl:col-span-6',
      '7': 'xl:col-span-7',
      '8': 'xl:col-span-8',
      '9': 'xl:col-span-9',
      '10': 'xl:col-span-10',
      '11': 'xl:col-span-11',
      '12': 'xl:col-span-12',
    },
    xxl: {
      '1': 'xxl:col-span-1',
      '2': 'xxl:col-span-2',
      '3': 'xxl:col-span-3',
      '4': 'xxl:col-span-4',
      '5': 'xxl:col-span-5',
      '6': 'xxl:col-span-6',
      '7': 'xxl:col-span-7',
      '8': 'xxl:col-span-8',
      '9': 'xxl:col-span-9',
      '10': 'xxl:col-span-10',
      '11': 'xxl:col-span-11',
      '12': 'xxl:col-span-12',
    },
    wide: {
      '1': 'wide:col-span-1',
      '2': 'wide:col-span-2',
      '3': 'wide:col-span-3',
      '4': 'wide:col-span-4',
      '5': 'wide:col-span-5',
      '6': 'wide:col-span-6',
      '7': 'wide:col-span-7',
      '8': 'wide:col-span-8',
      '9': 'wide:col-span-9',
      '10': 'wide:col-span-10',
      '11': 'wide:col-span-11',
      '12': 'wide:col-span-12',
    },
  },
  defaultVariants: {
    sm: '12',
    md: '12',
    lg: '12',
    xl: '12',
    xxl: '12',
    wide: '12',
  },
});

const DraupnirNode = ({
  property,
  widget: Widget,
  className,
}: DraupnirNodeProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={property?.location ?? property.id}
      render={({ field, fieldState, formState }) => (
        <FormItem
          className={cn(
            size({
              sm: (property.view?.sm?.toString() as TSize) ?? '12',
              md: (property.view?.md?.toString() as TSize) ?? '12',
              lg: (property.view?.lg?.toString() as TSize) ?? '12',
              xl: (property.view?.xl?.toString() as TSize) ?? '6',
              xxl: (property.view?.xxl?.toString() as TSize) ?? '6',
              wide: (property.view?.wide?.toString() as TSize) ?? '6',
            }),
            className
          )}
        >
          {(property.type !== 'boolean' ||
            (property?.type === 'boolean' && property?.widget === 'radio')) &&
            property?.widget !== 'separator' &&
            property?.widget !== 'heading' && (
              <FormLabel>
                {sentenceCase(property?.label ?? property.id)}
              </FormLabel>
            )}
          <FormControl>
            <Widget
              property={property}
              field={field}
              fieldState={fieldState}
              formState={formState}
            />
          </FormControl>
          {property?.helperText && (
            <FormDescription>{property.helperText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DraupnirNode;
