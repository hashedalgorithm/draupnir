import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Textarea } from '../../components/ui/textarea';
import { cn } from '../../lib/tw-util';

const TextareaWidget: FC<TWidgetProps> = props => {
  return (
    <Textarea
      name={props.property?.location ?? props.property?.id}
      maxLength={props.property?.maximum}
      minLength={props.property?.minimum}
      defaultValue={(props.property?.default as string) ?? ''}
      placeholder={props.property?.placeholder}
      required={props.property?.required}
      readOnly={props.property?.readOnly}
      className={cn(props?.className)}
    />
  );
};

export { TextareaWidget };
