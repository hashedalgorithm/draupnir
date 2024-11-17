import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DraupnirRoot, DraupnirInstanceProvider, DraupnirForm, TSchema, useFormContext, generateDefaultValues } from '../dist';
import "./index.css"
import FormComponent from './form-component';

const App = () => {
  const schema = {
    title: "Sample",
    version: "0.1",
    conditions: [
      // {
      //   type: "if",
      //   id: 'age',
      //   match: 18,
      //   operator: "lesser_or_equal",
      //   then: ['hasVoterId']
      // },
      // {
      //   type: "ifelse",
      //   id: "gender",
      //   match: "male",
      //   operator: "equal",
      //   then: ['height', 'weight'],
      //   else: ['weight']
      // },
      // {
      //   type: "select_injection",
      //   id: "gender",
      //   match: "male",
      //   mode: "replace",
      //   then: "weight",
      //   enum: ['less than 90', '90 - 100', '100 -120', '120 - 130'],
      // }
    ],
    properties: {
      'details.blood': {
        id: 'details.blood',
        type: 'string',
        placeholder: 'O +ve',
        required: true,
        label: "Blood Group",
        position: 3,
        minimum: 5,
        maximum: 10,
      },
      'details.address.streeno': {
        id: 'details.address.streeno',
        type: 'string',
        placeholder: 'No.123',
        label: "Streetno",
        position: 3,
        minimum: 5,
        maximum: 10,
      },
      'details.address.landmark': {
        id: 'details.address.landmark',
        type: 'string',
        maximum: 10,
        label: "Landmark",
        position: 3,
        minimum: 5,
        placeholder: 'Near playground'
      },
      'details.currency.code': {
        id: 'details.currency.code',
        type: 'string',
        label: "Currency",
        required: true,
        default: "INR",
        enum: ['INR', 'EUR'],
        widget: 'select',
        placeholder: 'INR'
      },
      'details.currency.amount': {
        id: 'details.currency.amount',
        type: 'number',
        minimum: 100,
        
        maximum: 1000,
        label: 'Amount',
        placeholder: '100'
      },
      fname: {
        id: "fname",
        type: "string",
        minimum: 10,
        maximum: 20,
        label: "First Name",
        errorText: "Enter valid firstname",
        position: 0,
        view: {
          lg: 6,
          xl: 4,
          xxl: 4,
          wide: 4
        }
      },
      lname: {
        id: "lname",
        type: "string",
        label: "Last Name",
        default: "Last Name",
        visible: true,
        position: 1,
        view: {
          lg: 6,
          xl: 4,
          xxl: 4,
          wide: 4
        }
      },
    },
  } satisfies TSchema;

  // console.log(generateDefaultValues(schema, {
  //   fname: "Sanjay"
  // }))
  return (
    <DraupnirRoot className='px-8 py-4'
      widgets={{
        base: {},
        nonreactive: {},
        custom: {},
      }}
    >
      <DraupnirInstanceProvider mode='all' className='grid grid-cols-12 gap-4' schema={schema} defaultValues={{
        fname: "Jansi",
        lname: "Rani"
      }}>
        <DraupnirForm
          onSubmit={(val) => {
            console.log(val, "onsubmit")
          }}
          schema={schema}
        >
          <button type='submit'>Submit</button>
        </DraupnirForm>
        <FormComponent />
      </DraupnirInstanceProvider>
    </DraupnirRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
