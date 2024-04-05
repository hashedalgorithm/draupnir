import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DraupnirRoot, DraupnirProvider, TSchema } from '../dist';
import "./index.css"

import "../dist/index"

const App = () => {
  const schema = {
    title: "Sample",
    id: 'sample',
    conditions: [],
    properties: {
      fname: {
        id: "fname",
        type: "string",
        minimum: 10,
      },
      lname: {
        id: "lname",
        type: "string"
      },
      age: {
        id: "age",
        type: "number",
        maximum: 50,
        minimum: 0
      },
      salu: {
        id: "salu",
        type: "boolean",
        widget: "radio",
        enum: ["mr.", "mrs.", "ms."]
      },
      gender: {
        id: "gender",
        type: "string",
        widget: 'select',
        enum: ['male', 'female', "others"]
      },
      isAgree: {
        id: "isAgree",
        type: "boolean",
      }
    },
    required: ["fname"],
    type: "object",
    version: "0.1"
  } satisfies TSchema

  return (
    <form>
      <DraupnirRoot className=''  
        widgets={{
          base: {},
          nonreactive: {},
          custom: {},
        }}
      >
        <DraupnirProvider schema={schema} id='' onSubmit={() => { }} ></DraupnirProvider>
      </DraupnirRoot>
    </form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
