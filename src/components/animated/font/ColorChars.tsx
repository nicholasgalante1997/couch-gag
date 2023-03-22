import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Font } from '../../font';

const textclip = keyframes`
    to {
        background-position: 200% center;
    }
`;

export const ColorChars = styled(Font)`
  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textclip} 2s linear infinite;
  display: inline-block;
  width: 105%;
`;