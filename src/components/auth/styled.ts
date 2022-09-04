import styled from 'styled-components';

type withDynamicFont = {
  fontFamily: string;
};

export const StyledForm = styled.form``;
export const StyledLabel = styled.label<withDynamicFont>`
  line-height: 1.5;
  font-size: 24px;
  display: block;
  font-family: ${(props) => props.fontFamily};
`;

export const StyledInput = styled.input<withDynamicFont>`
  padding: 4px;
  font-size: 16px;
  font-family: ${(props) => props.fontFamily};
  border-radius: 2px;
  background: white;
  width: ${(props) => props.width ?? '80%'};
`;
