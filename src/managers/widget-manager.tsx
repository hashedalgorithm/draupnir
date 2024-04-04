import { TWidgetProps } from '@/types/widgets';
import React from 'react';
import { useDraupnirRootContext } from '..';

const WidgetManager = (props: TWidgetProps) => {
  const { widgets: Widgets } = useDraupnirRootContext();

  if (!Widgets) return <p>Invalid widgets</p>;

  switch (props.property.widget) {
    case 'text':
      return <Widgets.custom.text {...props} /> ?? <textarea></textarea>;
    case 'checkbox':
      return (
        <Widgets.custom.checkbox {...props} /> ?? <input type="checkbox" />
      );
    case 'datepicker':
      return <Widgets.custom.datepicker {...props} /> ?? <input type="date" />;
    case 'select':
      return <Widgets.custom.select {...props} /> ?? <select></select>;
    case 'radio':
      return <Widgets.custom.radio {...props} /> ?? <input type="radio" />;
    default:
      return <p>Unknown widget</p>;
  }
};

export { WidgetManager };
