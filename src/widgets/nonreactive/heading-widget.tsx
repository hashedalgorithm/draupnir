import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Label } from '../../components/ui/label';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/tw-util';

const heading = cva('', {
  variants: {
    level: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
    },
  },
  defaultVariants: {
    level: 'h3',
  },
});

const HeadingWidget: FC<TWidgetProps> = props => {
  return (
    <Label
      className={cn(
        heading({
          level: props.property?.hlevel ?? 'h3',
        })
      )}
    >
      {props.property?.label}
    </Label>
  );
};

export { HeadingWidget };
