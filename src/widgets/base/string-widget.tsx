import React from 'react';
import { TWidgetProps } from '../../types/widgets';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/tw-util';

const StringWidget = (props: TWidgetProps) => {
  return (
    <Input
      type="string"
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

export { StringWidget };
