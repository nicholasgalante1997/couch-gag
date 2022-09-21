import type { SlideProps } from './types';

import { Container } from '@nickgdev/hellerui';

import css from '../../css/SlideIn.module.css';

function reduceClassNames(classNames: string[]) {
  return classNames.reduce((a, n) => {
    return a + ' ' + n;
  });
}

function reduceShakeClassName(shake?: boolean, fast?: boolean) {
  if (!shake && !fast) {
    return '';
  }
  if (fast) {
    return css['shake-fast'];
  } else {
    return css['shake'];
  }
}

function reduceSlideClassName(dir: 'left' | 'right', fast?: boolean) {
  switch (dir) {
    case 'left':
      return fast ? css['left-slide-in-fast'] : css['left-slide-in'];
    default:
      return fast ? css['right-slide-in-fast'] : css['right-slide-in'];
  }
}

const SlideIn = ({
  dir,
  children,
  fast = false,
  shake = false,
  shakeFast = false,
  ...rest
}: SlideProps) => (
  <Container
    {...rest}
    className={reduceClassNames([
      reduceSlideClassName(dir, fast),
      reduceShakeClassName(shake, shakeFast)
    ])}
  >
    {children}
  </Container>
);

export default SlideIn;
