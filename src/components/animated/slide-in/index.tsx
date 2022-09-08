import type { SlideProps } from './types';

import { Container } from '@nickgdev/hellerui';

import css from '../../css/SlideIn.module.css';

function reduceSlideClassName(dir: 'left' | 'right', fast?: boolean) {
  switch (dir) {
    case 'left':
      return fast ? css['left-slide-in-fast'] : css['left-slide-in'];
    default:
      return fast ? css['right-slide-in-fast'] : css['right-slide-in'];
  }
}

const SlideIn = ({ dir, children, fast = false, ...rest }: SlideProps) => (
  <Container {...rest} className={reduceSlideClassName(dir, fast)}>
    {children}
  </Container>
);

export default SlideIn;
