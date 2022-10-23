import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { navContainerStylesControl } from './styles';

export function NavContainer({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <Container width="100vw">
      <Container
        height="10vh"
        width="100%"
        padding="0.25rem"
        customStyles={navContainerStylesControl}
      >
        {children}
      </Container>
    </Container>
  );
}
