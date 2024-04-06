import React from 'react';
import DraupnirNode from '../draupnir-node';
import UnknownDraupnirNode from '../unknown-draupnir-node';
import { TWidgetProps } from '../../types/widgets';
import {
  CheckboxWidget,
  DatePickerWidget,
  RadioWidget,
  SelectWidget,
  TextareaWidget,
  SeparatorWidget,
  HeadingWidget,
  StringWidget,
} from '../../widgets';
import { useDraupnirRootContext } from '../draupnir-root';

const WidgetManager = (props: TWidgetProps) => {
  const {
    widgets: { base, custom, nonreactive },
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

    case 'separator':
      return (
        <DraupnirNode
          property={props.property}
          widget={nonreactive?.separator ?? SeparatorWidget}
        />
      );

    case 'heading':
      return (
        <DraupnirNode
          property={props.property}
          widget={nonreactive?.heading ?? HeadingWidget}
        />
      );

    case 'email':
      return (
        <DraupnirNode
          property={props.property}
          widget={base?.string ?? StringWidget}
        />
      );

    case 'url':
      return (
        <DraupnirNode
          property={props.property}
          widget={base?.string ?? StringWidget}
        />
      );

    default:
      return <UnknownDraupnirNode />;
  }
};

export { WidgetManager };
