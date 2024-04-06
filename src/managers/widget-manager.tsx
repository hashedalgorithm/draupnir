import React from 'react';
import { useDraupnirRootContext } from '..';
import DraupnirNode from '../components/draupnir-node';
import UnknownDraupnirNode from '../components/unknown-draupnir-node';
import { TWidgetProps } from '../types/widgets';
import {
  CheckboxWidget,
  DatePickerWidget,
  RadioWidget,
  SelectWidget,
  TextareaWidget,
} from '../widgets';

const WidgetManager = (props: TWidgetProps) => {
  const {
    widgets: { custom },
  } = useDraupnirRootContext();

  switch (props.property.widget) {
    case 'text':
      return (
        <DraupnirNode
          property={props.property}
          widget={custom.text ?? TextareaWidget}
        />
      );

    case 'checkbox':
      return (
        <DraupnirNode
          property={props.property}
          widget={custom.checkbox ?? CheckboxWidget}
        />
      );

    case 'datepicker':
      return (
        <DraupnirNode
          property={props.property}
          widget={custom?.datepicker ?? DatePickerWidget}
        />
      );

    case 'select':
      return (
        <DraupnirNode
          property={props.property}
          widget={custom?.select ?? SelectWidget}
        />
      );

    case 'radio':
      return (
        <DraupnirNode
          property={props.property}
          widget={custom?.radio ?? RadioWidget}
        />
      );

    default:
      return <UnknownDraupnirNode />;
  }
};

export { WidgetManager };
