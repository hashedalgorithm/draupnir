import React from 'react';
import { useDraupnirRootContext } from '../..';
import DraupnirNode from '../draupnir-node';
import UnknownDraupnirNode from '../unknown-draupnir-node';
import { TWidgetProps } from '../../types/widgets';
import { BooleanWidget, NumberWidget, StringWidget } from '../../widgets';

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
