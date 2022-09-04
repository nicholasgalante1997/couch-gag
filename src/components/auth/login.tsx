import { Container } from '@nickgdev/hellerui';
import { useReducer } from 'react';
import { useThemeContext } from '../../contexts';
import { StyledForm, StyledInput, StyledLabel } from './styled';

const initialState = {
  name: '',
  email: '',
  username: '',
  passwordPlt: ''
};

function formStateReducer(
  state: typeof initialState,
  action: { type: string; payload: string }
) {
  switch (action.type) {
    case 'update-name':
      return {
        ...state,
        name: action.payload
      };
    default:
      throw new Error('unhandled action');
  }
}

export const LoginForm = () => {
  const { font } = useThemeContext();

  const [state, dispatch] = useReducer(formStateReducer, initialState);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    // validate then update
    dispatch({ type: 'update-name', payload: e.target.value });
  }

  return (
    <Container height="100%" width="100%" margin="0 auto" padding="2rem">
      <StyledForm>
        {}
        <StyledLabel fontFamily={font.google.family}>Name</StyledLabel>
        <StyledInput
          value={state.name}
          onChange={handleNameChange}
          fontFamily={font.google.family}
        />
      </StyledForm>
    </Container>
  );
};
