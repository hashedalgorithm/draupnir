import React, { FC } from 'react';
import { TWidgetProps } from '../../types';

const CheckboxWidget: FC<TWidgetProps> = props => {
  return (
    <input
      type="checkbox"
      name={props.property.id}
      readOnly={props?.property.readOnly}
      required={props?.property.required}
      defaultChecked={!!props.property?.default}
    />
  );
};

export { CheckboxWidget };
