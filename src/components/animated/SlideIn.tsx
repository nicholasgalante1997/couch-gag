import { Container } from '@nickgdev/hellerui';
import { ContainerProps } from '@nickgdev/hellerui/lib/components/Container/types';

import css from '../css/SlideIn.module.css';

type SlideProps = {
  dir: 'left' | 'right';
  fast?: boolean;
  children: JSX.Element;
  id?: string;
} & ContainerProps;

function reduceSlideClassName(dir: 'left' | 'right', fast?: boolean) {
  switch (dir) {
    case 'left':
      return fast ? css['left-slide-in-fast'] : css['left-slide-in'];
    default:
      return fast ? css['right-slide-in-fast'] : css['right-slide-in'];
  }
}

export default ({ dir, children, fast = false, ...rest }: SlideProps) => (
  <Container {...rest} className={reduceSlideClassName(dir, fast)}>
    {children}
  </Container>
);
