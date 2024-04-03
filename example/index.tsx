import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Sample } from '../dist';

const App = () => {
  return (
    <div>
      <Sample />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
