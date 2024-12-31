'use client';

import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Textarea } from '../../components/ui/textarea';
import { cn } from '../../lib/tw-util';

const TextareaWidget: FC<TWidgetProps> = props => {
  return (
    <Textarea
      {...props.field}
      placeholder={props.property?.placeholder}
      className={cn(props?.className)}
    />
  );
};

export { TextareaWidget };
