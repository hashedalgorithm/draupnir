import React from 'react';
import { useDraupnirContext } from '../dist';

const FormComponent = () => {
  const formprops = useDraupnirContext();

  console.log(formprops);
  return <div>FormComponent</div>;
};

export default FormComponent;
