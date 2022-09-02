import { ContainerProps } from '@nickgdev/hellerui/lib/components/Container/types';

export type SlideProps = {
  dir: 'left' | 'right';
  fast?: boolean;
  children: JSX.Element;
  id?: string;
} & ContainerProps;
