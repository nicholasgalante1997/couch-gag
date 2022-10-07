import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { navContainerStylesControl } from './styles';

export function NavContainer({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <Container>
      <Container
        height="10vh"
        padding="0.25rem"
        customStyles={navContainerStylesControl}
      >
        {children}
      </Container>
    </Container>
  );
}
