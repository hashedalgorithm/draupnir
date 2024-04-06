import React, { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { TWidgetProps } from '../../types';
import { sentenceCase } from 'change-case';

const SelectWidget: FC<TWidgetProps> = props => {
  return (
    <Select {...props.field} onValueChange={props.field?.onChange}>
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
              {sentenceCase(item)}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export { SelectWidget };
