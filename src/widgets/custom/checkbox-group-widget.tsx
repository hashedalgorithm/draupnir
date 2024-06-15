import { startCase } from 'lodash';
import React, { FC, FormEventHandler } from 'react';
import { Label } from '../../components/ui/label';
import { TWidgetProps } from '../../types';

const CheckboxGroupWidget: FC<TWidgetProps> = props => {
  const handleOnChange: FormEventHandler<HTMLInputElement> = e => {
    const value = e.currentTarget.getAttribute('data-value');
    if (!value) return;

    const currentValues = ((props.field?.value as string[])?.filter(
      item => !!item
    ) ?? []) as string[];

    if (currentValues.includes(value)) {
      if (props.property?.minimum) {
        if (currentValues.length - 1 >= props.property.minimum) {
          props.field?.onChange(currentValues.filter(val => val !== value));
        }
      } else {
        props.field?.onChange(currentValues.filter(val => val !== value));
      }
    } else {
      if (props.property?.maximum) {
        if (currentValues.length + 1 <= props.property?.maximum) {
          props.field?.onChange([...currentValues, value]);
        }
      } else {
        props.field?.onChange([...currentValues, value]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {props.property?.enum &&
        props.property.enum.map((item, index) => (
          <div
            className="flex items-center gap-4"
            key={`checkbox-group-widget.defaultcheckbox.${props.property.id}.${item}.${index}`}
          >
            <input
              {...props.field}
              type="checkbox"
              disabled={
                typeof item === 'string'
                  ? props.property?.disabled
                  : item?.disabled
              }
              checked={props.field?.value?.includes(
                typeof item === 'string' ? item : item.value
              )}
              data-value={typeof item === 'string' ? item : item.value}
              className="w-4 h-4 accent-primary"
              onChange={handleOnChange}
            />
            <Label className="font-normal">
              {typeof item === 'string' ? startCase(item) : item.label}
            </Label>
          </div>
        ))}
    </div>
  );
};

export { CheckboxGroupWidget };
