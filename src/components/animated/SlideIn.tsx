import { Container } from '@nickgdev/hellerui';
import { ContainerProps } from '@nickgdev/hellerui/lib/components/Container/types';

import '../css/SlideIn.css';

type SlideProps = {
  dir: 'left' | 'right';
  fast?: boolean;
  children: JSX.Element;
  id?: string;
  shake?: boolean;
  shakeFast?: boolean;
} & ContainerProps;

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
    return 'shake-fast';
  } else {
    return 'shake';
  }
}

function reduceSlideClassName(dir: 'left' | 'right', fast?: boolean) {
  switch (dir) {
    case 'left':
      return fast ? 'left-slide-in-fast' : 'left-slide-in';
    default:
      return fast ? 'right-slide-in-fast' : 'right-slide-in';
  }
}

export default ({
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
