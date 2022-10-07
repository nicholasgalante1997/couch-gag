import styled, { css, keyframes } from 'styled-components';
import { WonderBallProps, WonderBallSize } from './types';

function reduceSizeCss(s: WonderBallSize) {
  switch (s) {
    case WonderBallSize.SMALL:
      return css`
        min-height: 1rem;
        min-width: 1rem;
        height: 1rem;
        width: 1rem;
        border-radius: 0.5rem;
      `;
    case WonderBallSize.MED:
      return css`
        height: 2rem;
        min-height: 2rem;
        width: 2rem;
        min-width: 2rem;
        border-radius: 1rem;
      `;
    case WonderBallSize.LG:
      return css`
        height: 3rem;
        min-height: 3rem;
        width: 3rem;
        min-width: 3rem;
        border-radius: 1.5rem;
      `;
    default:
      return css`
        min-height: 1rem;
        height: 1rem;
        min-width: 1rem;
        width: 1rem;
        border-radius: 0.5rem;
      `;
  }
}

function reduceBounceAnimYTarget(s: WonderBallSize) {
  switch (s) {
    case WonderBallSize.SMALL:
      return bounceSm;
    case WonderBallSize.MED:
      return bounceMd;
    case WonderBallSize.LG:
      return bounceLg;
    default:
      return bounceSm;
  }
}

function reduceBounceAnimYTiming(s: WonderBallSize) {
  switch (s) {
    case WonderBallSize.SMALL:
      return '1.2s';
    case WonderBallSize.MED:
      return '1.4s';
    case WonderBallSize.LG:
      return '1.5s';
    default:
      return '1.2s';
  }
}

const bounceSm = keyframes`
    0% {
        transform: translateY(0);
    }
    12.5% {
        transform: translateY(1rem);
    }
    25% {
        transform: translate(0);
    }
    37.5% {
        transform: translateY(0.81rem);
    }
    50% {
        transform: translateY(0);
    }
    62.5% {
        transform: translateY(0.49rem);
    }
    75% {
        transform: translateY(0);
    }
    87.5% {
        transform: translateY(0.23rem);
    }
    100% {
        transform: translateY(0);
    }
`;

const bounceMd = keyframes`
    0% {
        transform: translateY(0);
    }
    12.5% {
        transform: translateY(2rem);
    }
    25% {
        transform: translate(0);
    }
    37.5% {
        transform: translateY(1.6rem);
    }
    50% {
        transform: translateY(0);
    }
    62.5% {
        transform: translateY(0.8rem);
    }
    75% {
        transform: translateY(0);
    }
    87.5% {
        transform: translateY(0.44rem);
    }
    100% {
        transform: translateY(0);
    }
`;

const bounceLg = keyframes`
    0% {
        transform: translateY(0);
    }
    12.5% {
        transform: translateY(3rem);
    }
    25% {
        transform: translate(0);
    }
    37.5% {
        transform: translateY(2.2rem);
    }
    50% {
        transform: translateY(0);
    }
    62.5% {
        transform: translateY(1rem);
    }
    75% {
        transform: translateY(0);
    }
    87.5% {
        transform: translateY(0.5rem);
    }
    100% {
        transform: translateY(0);
    }
`;

export const WonderBall = styled.div<WonderBallProps>`
  display: inline-block;
  background: ${(props) => props.color};
  animation: ${(props) => reduceBounceAnimYTarget(props.size)}
    ${(props) => reduceBounceAnimYTiming(props.size)} ease-out 0s
    ${({ repeat = 'infinite' }) => repeat};
  ${(props) => reduceSizeCss(props.size)}
`;
