'use client';

import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/tw-util';

const NumberWidget: FC<TWidgetProps> = props => {
  return (
    <Input
      {...props.field}
      type="number"
      placeholder={props.property?.placeholder}
      className={cn(props?.className)}
      step={props.property?.step}
      pattern={props.property?.pattern}
      onChange={e => props.field?.onChange(e.currentTarget.valueAsNumber)}
    />
  );
};

export { NumberWidget };
