import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DraupnirRoot, DraupnirProvider } from '../dist';
import { TSchema } from '../dist/types/schema';
import "../dist/index"

const App = () => {
  const schema = {
    title: "Sample",
    id: 'sample',
    conditions: [],
    properties: {
      fname: {
        id: "fname",
        type: "string"
      },
      lname: {
        id: "lname",
        type: "string"
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
    <div>
      <DraupnirRoot
        
        widgets={{
          base: {},
          nonreactive: {},
          custom: {},
        }}
      >
        <DraupnirProvider schema={schema}></DraupnirProvider>
      </DraupnirRoot>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
