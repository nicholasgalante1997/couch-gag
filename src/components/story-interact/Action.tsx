import React, { useEffect } from 'react';
import { MetricType } from '@nickgdev/couch-gag-common-lib';
import { Button } from '@nickgdev/hellerui';
import { ActionProps } from './types';
import { emit } from '../../service/metric';

const SmartAction = (props: ActionProps<MetricType>) => {
  const {
    _id,
    metric: { metricName, subfield, value },
    text,
    className,
    id,
    background,
    border,
    icon
  } = props;

  const onClick = async () => {
    emit({ metricName, subfield, value });
  };

  return (
    <Button onClick={onClick} ghost>
      <span data-iconid={_id} id={id} className={'material-symbols-outlined'}>
        {icon}
      </span>
      {text}
    </Button>
  );
};

export default SmartAction;
