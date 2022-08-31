import { Metric, MetricType } from '@nickgdev/couch-gag-common-lib';
import { formatQueryParams, devApiTargets } from '../../utils';

export const emit = async ({
  metricName,
  subfield,
  value
}: Metric<MetricType>) => {
  if (process.env.NODE_ENV === 'development') return;
  const res = await fetch(
    formatQueryParams(devApiTargets.metricHub, {
      metric: metricName as string,
      subfield,
      value: value.toString()
    }),
    {
      method: 'GET',
      mode: 'cors',
      headers: [
        ['Content-Type', 'application/json'],
        ['x-ulysses-key', process.env.REACT_APP_ULYSSES_HASHED_KEY ?? 'null']
      ]
    }
  );
  const { status } = res;
  if (status > 299) {
    console.error('microservice responded w err code');
    console.error(await res.json());
  }
};
