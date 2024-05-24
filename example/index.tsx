import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DraupnirRoot, DraupnirProvider, TSchema } from '../dist';
import "./index.css"

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
        minimum: 5,
        maximum: 10,
      },
      'details.address.streeno': {
        id: 'details.address.streeno',
        type: 'string',
        placeholder: 'No.123',
        required: true,
        label: "Streetno",
        minimum: 5,
        maximum: 10,
      },
      'details.address.landmark': {
        id: 'details.address.landmark',
        type: 'string',
        maximum: 10,
        label: "Landmark",
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
        required: true,
        label: "First Name",
        errorText: "Enter valid firstname",
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
        view: {
          lg: 6,
          xl: 4,
          xxl: 4, 
          wide: 4
        }
      },
    },
  } satisfies TSchema;


  return (
      <DraupnirRoot className='px-8 py-4'  
        widgets={{
          base: {
          },
          nonreactive: {},
          custom: {},
        }}
      >
      <DraupnirProvider mode='all' className='grid grid-cols-12 gap-4' schema={schema} onSubmit={(val) => { 
        console.log(val, "onsubmit")
      }} onChange={(val) => { console.log(val) }}>
        <button type='submit'>submit</button>
      </DraupnirProvider>
      </DraupnirRoot>
      );
};

ReactDOM.render(<App />, document.getElementById('root'));
