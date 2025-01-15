import React, { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

type DraupnirInstanceFormProps = PropsWithChildren<{
  onSubmit: (values: unknown) => Promise<void> | void;
  onError?: (errors: unknown) => Promise<void> | void;
  className?: string;
}>;
const DraupnirInstanceForm = ({
  children,
  onSubmit,
  onError,
  className,
}: DraupnirInstanceFormProps) => {
  const formProps = useFormContext();
  return (
    <form
      onSubmit={formProps.handleSubmit(onSubmit, onError)}
      className={className}
    >
      {children}
    </form>
  );
};

export { DraupnirInstanceForm };
