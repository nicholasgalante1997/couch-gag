import { Metric, MetricType } from '@nickgdev/couch-gag-common-lib';

export type IconName = 'favorite' | 'share';

export interface ActionPropsNative<T extends MetricType> {
  text: string;
  _id: string;
  metric: Metric<T>;
  border: string;
  background: string;
  icon: IconName;
}

export type ActionProps<T extends MetricType> = ActionPropsNative<T> &
  Partial<Pick<HTMLElement, 'id' | 'className'>>;
