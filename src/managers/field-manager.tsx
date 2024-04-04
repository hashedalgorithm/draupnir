import { TWidgetProps } from '@/types/widgets';
import React from 'react';
import { useDraupnirRootContext } from '..';

const FieldManager = ({ property, ...props }: TWidgetProps) => {
  const { widgets: Widgets } = useDraupnirRootContext();

  if (!Widgets) return <p>Invalid widgets!!</p>;

  switch (property.type) {
    case 'boolean':
      return <p>booleam</p>;
    case 'string':
      return <p>booleam</p>;
    case 'number':
      return <p>booleam</p>;
    default:
      return <p>default</p>;
  }
};

export { FieldManager };
