import styled from 'styled-components';

type withDynamicFont = {
  fontFamily: string;
};

export const StyledForm = styled.form`
  margin-top: 3rem;
  padding: 2rem;
  background: ${(props) => props.color};
  border-radius: 4px;
`;

export const StyledLabel = styled.label<withDynamicFont>`
  line-height: 1.35;
  font-size: 16px;
  display: block;
  font-family: ${(props) => props.fontFamily};
  font-weight: 300;
  margin: 12px;
  text-decoration: underline ${(props) => props.color};
`;

export const StyledInput = styled.input<
  withDynamicFont & { hColor: string; aColor: string }
>`
  padding: 8px;
  font-size: 14px;
  line-height: 1;
  font-family: ${(props) => props.fontFamily};
  border: 1px solid black;
  height: 16px;
  border-radius: 4px;
  background: white;
  width: ${(props) => props.width ?? '80%'};

  &:hover {
    cursor: pointer;
    border: 2px solid ${(props) => props.hColor};
    box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.2);
  }

  &:active {
    border: 2px solid ${(props) => props.aColor};
  }
`;
