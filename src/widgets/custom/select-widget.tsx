'use client';

import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { TWidgetProps } from '../../types';
import { startCase } from 'lodash';

const SelectWidget: FC<TWidgetProps> = props => {
  return (
    <Select
      disabled={props.field?.disabled}
      value={props.field?.value}
      onValueChange={props.field?.onChange}
      name={props.field?.name}
    >
      <SelectTrigger name={props.field?.name}>
        <SelectValue placeholder={props.property.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.property?.enum &&
          props.property.enum.map((item, index) => (
            <SelectItem
              key={`widgetmanager.select.defaultselect.option.${props.property.id}.${index}`}
              value={typeof item === 'string' ? item : item.value}
              disabled={
                typeof item === 'string'
                  ? props?.property?.disabled
                  : item?.disabled
              }
            >
              {typeof item === 'string' ? startCase(item) : item.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export { SelectWidget };
