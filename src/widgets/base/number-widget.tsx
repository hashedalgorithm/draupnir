import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/tw-util';

const NumberWidget: FC<TWidgetProps> = props => {
  return (
    <Input
      type="number"
      name={props.property?.location ?? props.property?.id}
      max={props.property?.maximum}
      min={props.property?.minimum}
      defaultValue={(props.property?.default as number) ?? ''}
      placeholder={props.property?.placeholder}
      required={props.property?.required}
      readOnly={props.property?.readOnly}
      className={cn(props?.className)}
      step={props.property?.step}
      pattern={props.property?.pattern}
      disabled={props.property.disabled}
    />
  );
};

export { NumberWidget };
