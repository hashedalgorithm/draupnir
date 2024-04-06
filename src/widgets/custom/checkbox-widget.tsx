import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Label } from '../../components/ui/label';
import { sentenceCase } from 'change-case';

const CheckboxWidget: FC<TWidgetProps> = props => {
  return (
    <div className="flex gap-4 items-center">
      <input
        {...props.field}
        type="checkbox"
        checked={props.field?.value}
        onChange={props.field?.onChange}
        onBlur={props.field?.onBlur}
        className="w-4 h-4 accent-primary"
      />
      <Label>{sentenceCase(props.property?.label ?? props.property.id)}</Label>
    </div>
  );
};

export { CheckboxWidget };
