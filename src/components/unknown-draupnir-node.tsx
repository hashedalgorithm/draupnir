import { RocketIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Alert, AlertTitle } from './ui/alert';

const UnknownDraupnirNode = () => {
  return (
    <Alert variant="default">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Unknown Widget!</AlertTitle>
    </Alert>
  );
};

export default UnknownDraupnirNode;
