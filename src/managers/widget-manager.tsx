import React from 'react';
import { useDraupnirRootContext } from '..';
import { TWidgetProps } from '../types/widgets';

const WidgetManager = (props: TWidgetProps) => {
  const { widgets } = useDraupnirRootContext();

  const { custom } = widgets;

  switch (props.property.widget) {
    case 'text':
      return custom?.text ? (
        <custom.text {...props} />
      ) : (
        <textarea
          name={props.property.id}
          readOnly={props?.readOnly}
          required={props?.required}
          placeholder={props.property?.placeholder}
          defaultValue={props.property?.default as string}
          maxLength={props.property?.maximum}
          minLength={props.property?.minimum}
        ></textarea>
      );
    case 'checkbox':
      return custom?.checkbox ? (
        <custom.checkbox {...props} />
      ) : (
        <input
          type="checkbox"
          name={props.property.id}
          readOnly={props?.readOnly}
          required={props?.required}
          defaultChecked={!!props.property?.default}
        />
      );
    case 'datepicker':
      return custom?.datepicker ? (
        <custom.datepicker {...props} />
      ) : (
        <input
          type="date"
          name={props.property.id}
          readOnly={props?.readOnly}
          required={props?.required}
          placeholder={props.property?.placeholder}
          defaultValue={props.property?.default as string}
        />
      );
    case 'select':
      return custom?.select ? (
        <custom.select {...props} />
      ) : (
        <select name={props.property.id} required={props?.required}>
          {props.property?.enum &&
            props.property.enum.map((item, index) => (
              <option
                key={`widgetmanager.select.defaultselect.option.${props.property.id}.${index}`}
                value={item}
              >
                {item}
              </option>
            ))}
        </select>
      );
    case 'radio':
      return custom?.radio ? (
        <custom.radio {...props} />
      ) : (
        <>
          {props.property?.enum &&
            props.property.enum.map((item, index) => (
              <input
                key={`widgetmanager.radio.defaultradio.${props.property.id}.${index}`}
                type="radio"
                defaultChecked={!!props.property.default}
                name={props.property.id}
                readOnly={props?.readOnly}
                required={props?.required}
                value={item}
              />
            ))}
        </>
      );
    default:
      return <p>Unknown widget</p>;
  }
};

export { WidgetManager };
