'use client';

import React, { FC } from 'react';
import { TWidgetProps } from '../../types/widgets';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/tw-util';

const StringWidget: FC<TWidgetProps> = props => {
  return (
    <Input
      {...props.field}
      type="string"
      placeholder={props.property?.placeholder}
      className={cn(props?.className)}
      pattern={props.property?.pattern}
    />
  );
};

export { StringWidget };
