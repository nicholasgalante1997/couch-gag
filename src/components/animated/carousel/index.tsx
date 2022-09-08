import { useEffect, useState } from 'react';
import type { CarouselProps } from './types';
import { Container } from '@nickgdev/hellerui';

function Carousel(props: CarouselProps) {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (current === props.items.length - 1) {
        setCurrent(0);
      } else {
        setCurrent((c) => c + 1);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <Container
      id="carousel-parent"
      customStyles={{
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container
        id="carousel-item-parent"
        customStyles={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.items[current]}
      </Container>
    </Container>
  );
}

export default Carousel;
