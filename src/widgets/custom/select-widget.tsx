import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { TWidgetProps } from '../../types';

const SelectWidget: FC<TWidgetProps> = props => {
  return (
    <Select
      required={props.property.required}
      disabled={props.property.disabled}
      defaultValue={props.property?.default as string}
    >
      <SelectTrigger name={props.property?.location ?? props.property?.id}>
        <SelectValue placeholder={props.property.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.property?.enum &&
          props.property.enum.map((item, index) => (
            <SelectItem
              key={`widgetmanager.select.defaultselect.option.${props.property.id}.${index}`}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export { SelectWidget };
