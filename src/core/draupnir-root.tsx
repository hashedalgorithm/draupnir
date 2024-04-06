import React, { PropsWithChildren, createContext, useContext } from 'react';
import { TWidget } from '../types/widgets';
import { cn } from '../lib/tw-util';

type DraupnirRootProps = PropsWithChildren<{
  widgets: TWidget;
  className?: string;
}>;

type DraupnirRootState = {
  widgets: TWidget;
};

const RawContext = createContext<DraupnirRootState>({
  widgets: {
    base: {},
    custom: {},
    nonreactive: {},
  },
});

const useDraupnirRootContext = () => useContext(RawContext);

const DraupnirRoot = ({ children, widgets, className }: DraupnirRootProps) => {
  return (
    <RawContext.Provider value={{ widgets }}>
      <section className={cn(className)}>{children}</section>
    </RawContext.Provider>
  );
};

export { DraupnirRoot, useDraupnirRootContext };
