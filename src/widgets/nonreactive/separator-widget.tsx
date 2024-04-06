import React, { FC } from 'react';
import { TWidgetProps } from '../../types';
import { Separator } from '../../components/ui/separator';

const SeparatorWidget: FC<TWidgetProps> = props => {
  return <Separator id={props.property.id} />;
};

export { SeparatorWidget };
