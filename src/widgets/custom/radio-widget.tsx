import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Label } from '../../components/ui/label';
import { sentenceCase } from 'change-case';

const RadioWidget: FC<TWidgetProps> = props => {
  return (
    <div className="flex flex-col gap-2">
      {props.property?.enum &&
        props.property.enum.map((item, index) => (
          <div
            className="flex items-center gap-4"
            key={`radio-widget.radio.defaultradio.${props.property.id}.${item}.${index}`}
          >
            <input
              {...props.field}
              type="radio"
              value={item}
              checked={props.field?.value === item}
              className="w-4 h-4 accent-primary"
              onChange={props?.field?.onChange}
            />
            <Label>{sentenceCase(item)}</Label>
          </div>
        ))}
    </div>
  );
};

export { RadioWidget };
