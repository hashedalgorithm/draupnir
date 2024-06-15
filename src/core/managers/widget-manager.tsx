import React from 'react';
import { TWidgetProps } from '../../types';
import {
  CheckboxWidget,
  DatePickerWidget,
  HeadingWidget,
  RadioWidget,
  SelectWidget,
  SeparatorWidget,
  StringWidget,
  TextareaWidget,
} from '../../widgets';
import DraupnirNode from '../draupnir-node';
import { useDraupnirRootContext } from '../draupnir-root';
import UnknownDraupnirNode from '../unknown-draupnir-node';
import { CheckboxGroupWidget } from '../../widgets/custom/checkbox-group-widget';

type WidgetManagerProps = Pick<TWidgetProps, 'condition' | 'property'>;
const WidgetManager = (props: WidgetManagerProps) => {
  const {
    widgets: { base, custom, nonreactive },
  } = useDraupnirRootContext();

  switch (props.property.widget) {
    case 'text':
      return <DraupnirNode {...props} widget={custom.text ?? TextareaWidget} />;

    case 'checkbox':
      return (
        <DraupnirNode {...props} widget={custom.checkbox ?? CheckboxWidget} />
      );

    case 'checkbox-group':
      return (
        <DraupnirNode
          {...props}
          widget={custom?.['checkbox-group'] ?? CheckboxGroupWidget}
        />
      );

    case 'datepicker':
      return (
        <DraupnirNode
          {...props}
          widget={custom?.datepicker ?? DatePickerWidget}
        />
      );

    case 'select':
      return (
        <DraupnirNode {...props} widget={custom?.select ?? SelectWidget} />
      );

    case 'radio':
      return <DraupnirNode {...props} widget={custom?.radio ?? RadioWidget} />;

    case 'separator':
      return (
        <DraupnirNode
          {...props}
          widget={nonreactive?.separator ?? SeparatorWidget}
        />
      );

    case 'heading':
      return (
        <DraupnirNode
          {...props}
          widget={nonreactive?.heading ?? HeadingWidget}
        />
      );

    case 'email':
      return <DraupnirNode {...props} widget={base?.string ?? StringWidget} />;

    case 'url':
      return <DraupnirNode {...props} widget={base?.string ?? StringWidget} />;

    default:
      return <UnknownDraupnirNode />;
  }
};

export { WidgetManager };
