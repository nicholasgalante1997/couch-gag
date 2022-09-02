import type { HoverableProps } from './types';

import styled from 'styled-components';
import { _heller_base } from '@nickgdev/hellerui';

export const Hoverable = styled.div<HoverableProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.from?.color ?? 'white'};
  font-size: ${(props) => props.from?.fontSize ?? '.75rem'};
  &:hover {
    font-size: ${(props) => props.to?.fontSize ?? '1rem'};
    color: ${(props) =>
      props.to?.color ?? _heller_base.colors.mcwatt.flickrPink};
  }
`;
