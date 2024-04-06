import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { cn } from '../../lib/tw-util';

const BooleanWidget: FC<TWidgetProps> = props => {
  return (
    <div className={cn('flex items-center space-x-2 w-full', props?.className)}>
      <Switch
        id={props.property.id}
        defaultChecked={!!props.property.default}
        required={props.property?.required}
        name={props.property?.location ?? props.property?.id}
        disabled={props.property?.disabled}
      />
      <Label
        htmlFor={props.property.id}
        aria-disabled={props.property?.disabled}
      >
        Airplane Mode
      </Label>
    </div>
  );
};

export { BooleanWidget };
