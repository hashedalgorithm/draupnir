'use client';

import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Label } from '../../components/ui/label';
import { startCase } from 'lodash';

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
              value={typeof item === 'string' ? item : item.value}
              disabled={
                typeof item === 'string'
                  ? props.property?.disabled
                  : item?.disabled
              }
              checked={
                props.field?.value ===
                (typeof item === 'string' ? item : item.value)
              }
              className="w-4 h-4 accent-primary"
            />
            <Label className="font-normal">
              {typeof item === 'string' ? startCase(item) : item.label}
            </Label>
          </div>
        ))}
    </div>
  );
};

export { RadioWidget };
