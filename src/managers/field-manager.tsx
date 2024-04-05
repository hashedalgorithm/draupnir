import React from 'react';
import { useDraupnirRootContext } from '..';
import { TWidgetProps } from '../types/widgets';

const FieldManager = (props: TWidgetProps) => {
  const { widgets } = useDraupnirRootContext();

  const { base } = widgets;

  switch (props.property.type) {
    case 'string':
      return base.string ? (
        <base.string {...props} />
      ) : (
        <input
          type="string"
          name={props.property?.id}
          maxLength={props.property?.maximum}
          minLength={props.property?.minimum}
          defaultValue={(props.property?.default as string) ?? ''}
          placeholder={props.property?.placeholder}
        />
      );
    case 'boolean':
      return base.boolean ? (
        <base.boolean {...props} />
      ) : (
        <input
          defaultChecked={!!props.property.default}
          type="checkbox"
          name={props.property.id}
        />
      );
    case 'number':
      return base.number ? (
        <base.number {...props} />
      ) : (
        <input
          type="number"
          name={props.property?.id}
          max={props.property?.maximum}
          min={props.property?.minimum}
          defaultValue={(props.property?.default as string) ?? ''}
          placeholder={props.property?.placeholder}
        />
      );
    default:
      return <p>Unknown widget</p>;
  }
};

export { FieldManager };
