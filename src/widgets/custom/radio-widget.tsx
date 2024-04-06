import React, { FC } from 'react';
import { TWidgetProps } from '../../types';

const RadioWidget: FC<TWidgetProps> = props => {
  return (
    <>
      {props.property?.enum &&
        props.property.enum.map((item, index) => (
          <input
            key={`radio-widget.radio.defaultradio.${props.property.id}.${index}`}
            type="radio"
            defaultChecked={!!props.property.default}
            name={props.property?.location ?? props.property.id}
            readOnly={props?.property.readOnly}
            required={props?.property.required}
            value={item}
            className="w-4 h-4 accent-primary"
          />
        ))}
    </>
  );
};

export { RadioWidget };
