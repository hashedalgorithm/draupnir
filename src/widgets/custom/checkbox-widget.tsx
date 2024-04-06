import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Label } from '../../components/ui/label';
import { sentenceCase } from 'change-case';

const CheckboxWidget: FC<TWidgetProps> = props => {
  return (
    <div className="flex gap-4 items-center">
      <input
        type="checkbox"
        name={props.property.id}
        readOnly={props?.property.readOnly}
        required={props?.property.required}
        defaultChecked={!!props.property?.default}
        disabled={props.property.disabled}
        className="w-4 h-4 accent-primary"
      />
      <Label>{sentenceCase(props.property?.label ?? props.property.id)}</Label>
    </div>
  );
};

export { CheckboxWidget };
