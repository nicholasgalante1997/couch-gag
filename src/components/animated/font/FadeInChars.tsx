import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Font, FontProps } from '../../font';

const scale = keyframes`
    100% {
      transform: scale(1);
    }
`;

const fadeIn = keyframes`
    100% {
      opacity: 1;
      filter: blur(0);
    }
`;
 
function generateSpanNthChildStyles(bound: number){
    let styleStringArr = [];
    for (let x = 1; x <= bound; x++) {
        styleStringArr.push(
        css`
          & > span:nth-child(${x}) {
                animation: ${fadeIn} 0.8s 0.${x}s forwards cubic-bezier(0.11, 0, 0.5, 0);
            }
        `
        )
    }
    return css`
        ${styleStringArr}
    `;
}

export const StyledFadeInChars = styled(Font)<{ bound: number }>`
  max-width: 40ch;
  color: white;
  text-align: center;
  transform: scale(0.94);
  animation: ${scale} 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
  & > span {
    display: inline-block;
    opacity: 0;
    filter: blur(4px);
  }
  ${props => generateSpanNthChildStyles(props.bound)}
`;

export function FadeInChars({ children, ...rest }: { children: string } & FontProps) {
    if (typeof children !== 'string') {
        console.error('<FadeInChars /> Exception: Children must be of type string to utilize fade in animation.');
        return (
            <Font {...rest}>
                {children}
            </Font>
        );
    }
    const stringChildNodes = children.split(' ');
    const length = stringChildNodes.length;

    return (
        <StyledFadeInChars {...rest} bound={length + 1}>
           {stringChildNodes.map(childNode => <span>{childNode}&nbsp;</span>)}
        </StyledFadeInChars>
    );
}