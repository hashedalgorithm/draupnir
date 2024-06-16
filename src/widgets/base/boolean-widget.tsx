import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { cn } from '../../lib/tw-util';
import { startCase } from 'lodash';

const BooleanWidget: FC<TWidgetProps> = props => {
  return (
    <div className={cn('flex items-center space-x-2 w-full', props?.className)}>
      <Switch
        {...props.field}
        checked={props.field?.value}
        onCheckedChange={props.field?.onChange}
      />
      <Label
        className="font-normal"
        htmlFor={props.property.id}
        aria-disabled={props.property?.disabled}
      >
        {props.property?.label ?? startCase(props.property.id)}
      </Label>
    </div>
  );
};

export { BooleanWidget };
