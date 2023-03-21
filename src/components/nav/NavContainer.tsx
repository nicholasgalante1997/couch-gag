import React from 'react';
import { Container } from '@nickgdev/hellerui';
import * as CSS from 'csstype';
import { useThemeContext } from '../../contexts';

export function NavContainer({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const { darkMode } = useThemeContext();
  const baseStyles: CSS.Properties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    justifySelf: 'center',
    width: '90%',
    borderBottom: darkMode ? '1px solid white' : '1px solid black'
  };
  return (
    <Container width="100vw">
      <Container
        height="10vh"
        width="100%"
        padding="0.25rem"
        customStyles={baseStyles}
      >
        {children}
      </Container>
    </Container>
  );
}
