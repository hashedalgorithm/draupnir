import { TWidget } from '@/types/widgets';
import React, { PropsWithChildren, createContext, useContext } from 'react';

type DraupnirRootProps = PropsWithChildren<{
  widgets: TWidget | null;
}>;

type DraupnirRootState = {
  widgets: TWidget | null;
};

const RawContext = createContext<DraupnirRootState>({ widgets: null });

const useDraupnirRootContext = () => useContext(RawContext);

const DraupnirRoot = ({ children, widgets }: DraupnirRootProps) => {
  if (!widgets) return <p>Invalid Widgets initialization!</p>;

  return (
    <RawContext.Provider value={{ widgets }}>
      <section
        key={`draupnir.root.${'store'}`}
        className="grid sm:grid-cols-6 grid-cols-12"
      >
        {children}
      </section>
    </RawContext.Provider>
  );
};

export { DraupnirRoot, useDraupnirRootContext };
