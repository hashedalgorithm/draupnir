'use client';

import React from 'react';
import { useDraupnirRootContext } from '../..';
import DraupnirNode from '../draupnir-node';
import UnknownDraupnirNode from '../unknown-draupnir-node';
import { TWidgetProps } from '../../types/widgets';
import { BooleanWidget, NumberWidget, StringWidget } from '../../widgets';

type FieldManagerProps = Pick<TWidgetProps, 'condition' | 'property'>;
const FieldManager = (props: FieldManagerProps) => {
  const {
    widgets: { base },
  } = useDraupnirRootContext();

  switch (props.property.type) {
    case 'string':
      return <DraupnirNode widget={base?.string ?? StringWidget} {...props} />;
    case 'boolean':
      return (
        <DraupnirNode widget={base?.boolean ?? BooleanWidget} {...props} />
      );
    case 'number':
      return <DraupnirNode widget={base?.number ?? NumberWidget} {...props} />;
    default:
      return <UnknownDraupnirNode />;
  }
};

export { FieldManager };
