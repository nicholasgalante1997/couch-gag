import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Font } from '../../font';

const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const FadeUpChars = styled(Font)`
    animation: 2s ease-out 0s 1 ${fadeUp}; 
`