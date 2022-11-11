import { Metric, MetricType } from '@nickgdev/couch-gag-common-lib';
import { devApiTargets } from '../../utils';

export const emit = async (metric: Metric<MetricType>) => {
  if (process.env.NODE_ENV === 'development') return;
  const res = await fetch(
    devApiTargets.metricHub + metric.parseMetricQueryParams(),
    {
      method: 'GET',
      mode: 'cors',
      headers: [
        ['Content-Type', 'application/json'],
        ['x-ulysses-key', process.env.NEXT_PUBLIC_ULYSSES_HASHED_KEY ?? 'null']
      ]
    }
  );
  const { status } = res;
  if (status > 299) {
    console.error('microservice responded w err code');
    console.error(await res.json());
    return;
  }
};
