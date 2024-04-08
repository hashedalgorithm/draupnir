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
      {
        type: "if",
        id: 'age',
        match: 18,
        operator: "lesser_or_equal",
        then: ['hasVoterId']
      },
      {
        type: "ifelse",
        id: "gender",
        match: "male",
        operator: "equal",
        then: ['height', 'weight'],
        else: ['weight']
      },
      {
        type: "select_injection",
        id: "gender",
        match: "male",
        mode: "replace",
        then: "weight",
        enum: ['less than 90', '90 - 100', '100 -120', '120 - 130'],
      }
    ],
    properties: {
      title: {
        id: "title",
        type: "string",
        widget: "heading",
        hlevel: "h2",
        label: "Personal Details Form"
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
      fullname: {
        id: "fullname",
        type: "string",
        label: "Full Name",
        maximum: 20,
        minimum: 5,
        view: {
          lg: 12,
          xl: 4,
          xxl: 4, 
          wide: 4
        }
      },
      age: {
        id: "age",
        type: "number",
        maximum: 50,
        minimum: 0
      },
      hasVoterId: {
        id: "hasVoterId",
        type: 'boolean',
        label: "Do you have Voter ID (Provided by your Respected Governtment)",
        helperText: "If you have applied and waiting for issue, then please choose 'yes'."
      },
      salu: {
        id: "salu",
        type: "string",
        widget: "radio",
        enum: ["mr.", "mrs.", "ms."],
        default: "mr."
      },
      gender: {
        id: "gender",
        type: "string",
        widget: 'select',
        enum: ['male', 'female', "others"],
        default: "male"
      },
      weight: {
        id: "weight",
        type: "string",
        widget: 'select',
        enum: ['Lesser than 50', '55 - 60', "60 - 80"],
      },
      height: {
        id: "height",
        type: "string",
        widget: 'select',
        label: "Height (CM)",
        enum: ['lesser than 150', '150 - 170', "Greater than 170"],
        default: "lesser than 150"
      },
      isAgree: {
        id: "isAgree",
        type: "boolean",
        required: true
      },
      separator: {
        id: "separator",
        type: "string",
        widget: "separator"
      }
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
      }} onChange={(val) => { console.log(val) }} >
        <button type='submit'>submit</button>
      </DraupnirProvider>
      </DraupnirRoot>
      );
};

ReactDOM.render(<App />, document.getElementById('root'));
