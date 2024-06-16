import React from 'react';
import { useDraupnirInstanceContext } from '../dist';

const FormComponent = () => {
  const formprops = useDraupnirInstanceContext();
  console.log(formprops);
  return <div>FormComponent</div>;
};

export default FormComponent;
