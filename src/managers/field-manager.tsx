import React from 'react';
import { useDraupnirRootContext } from '..';
import { TWidgetProps } from '../types/widgets';
import { StringWidget } from '../widgets/string-widget';
import DraupnirNode from '../components/draupnir-node';
import BooleanWidget from '../widgets/boolean-widget';
import NumberWidget from '../widgets/number-widget';
import UnknownDraupnirNode from '../components/unknown-draupnir-node';

const FieldManager = (props: TWidgetProps) => {
  const {
    widgets: { base },
  } = useDraupnirRootContext();

  switch (props.property.type) {
    case 'string':
      return (
        <DraupnirNode
          widget={base?.string ?? StringWidget}
          property={props.property}
        />
      );
    case 'boolean':
      return (
        <DraupnirNode
          widget={base?.boolean ?? BooleanWidget}
          property={props.property}
        />
      );
    case 'number':
      return (
        <DraupnirNode
          widget={base?.number ?? NumberWidget}
          property={props.property}
        />
      );
    default:
      return <UnknownDraupnirNode />;
  }
};

export { FieldManager };
