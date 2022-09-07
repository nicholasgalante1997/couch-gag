import { Button, Container } from '@nickgdev/hellerui';
import { useReducer, useState } from 'react';
import { useThemeContext } from '../../contexts';
import { forwardVarText, getSafeFontKey, pageStyles } from '../../utils';
import { StyledForm, StyledInput, StyledLabel } from './styled';

type FormErrorStateType = {
  component: 'name' | 'email' | 'username' | 'passwordPlt';
  exception: string;
};

const initialState: {
  name: string;
  email: string;
  username: string;
  passwordPlt: string;
  hasErrorState: boolean;
  errorState?: FormErrorStateType;
} = {
  name: '',
  email: '',
  username: '',
  passwordPlt: '',
  hasErrorState: false
};

function formStateReducer(
  state: typeof initialState,
  action: { type: string; payload: string; errorState?: FormErrorStateType }
) {
  switch (action.type) {
    case 'update-name':
      return {
        ...state,
        name: action.payload
      };
    case 'update-email':
      return {
        ...state,
        email: action.payload
      };
    case 'update-username':
      return {
        ...state,
        username: action.payload
      };
    case 'update-password':
      return {
        ...state,
        passwordPlt: action.payload
      };
    case 'update-error-state':
      if (typeof action.errorState === 'undefined') return state;
      return {
        ...state,
        hasErrorState: true,
        errorState: action.errorState
      };
    default:
      throw new Error('unhandled action');
  }
}

export const LoginForm = () => {
  const { font, palette } = useThemeContext();

  const [state, dispatch] = useReducer(formStateReducer, initialState);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  const formFieldElems = [
    renderNameFormField(),
    renderEmailFormField(),
    renderUserNameFormField(),
    renderPasswordFormField()
  ] as const;

  function renderFormTitleSection() {
    return (
      <>
        {forwardVarText(
          getSafeFontKey(font.google.family),
          'Join the couch gag!',
          'h1',
          {
            customStyles: {
              marginBottom: '2rem',
              marginTop: '2rem',
              color: palette.headingSecondaryColor,
              fontSize: '71px'
            }
          }
        )}
        <Container width="100%" customStyles={pageStyles}>
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'reasons you would want to join',
            'span',
            {
              customStyles: {
                color: palette.backgroundTertiaryColor
              }
            }
          )}
          <ul>
            <li
              style={{
                fontFamily: font.google.family,
                color: palette.backgroundTertiaryColor
              }}
            >
              you can bookmark your place in stories!
            </li>
            <li
              style={{
                fontFamily: font.google.family,
                color: palette.backgroundTertiaryColor
              }}
            >
              you can customize your theme and font!
            </li>
            <li
              style={{
                fontFamily: font.google.family,
                color: palette.backgroundTertiaryColor
              }}
            >
              you'll be notified when new stories come out!
            </li>
            <li
              style={{
                fontFamily: font.google.family,
                color: palette.backgroundTertiaryColor
              }}
            >
              you don't hate puppies
            </li>
          </ul>
        </Container>
      </>
    );
  }

  function renderNameFormField() {
    return (
      <Container width="100%" customStyles={pageStyles}>
        <StyledLabel
          color={palette.headingSecondaryColor}
          fontFamily={font.google.family}
        >
          what's your name, what's your sign
        </StyledLabel>
        <StyledInput
          value={state.name}
          onChange={handleNameChange}
          fontFamily={font.google.family}
          width="300px"
          color={palette.backgroundComplimentColor}
          placeholder="your name or your friend's we dont care"
          hColor={palette.backgroundTertiaryColor}
          aColor={palette.backgroundComplimentColor}
        />
      </Container>
    );
  }

  function renderUserNameFormField() {
    return (
      <Container width="100%" customStyles={pageStyles}>
        <StyledLabel
          color={palette.headingSecondaryColor}
          fontFamily={font.google.family}
        >
          what do we call u tho in our database
        </StyledLabel>
        <StyledInput
          value={state.username}
          onChange={handleUserNameChange}
          fontFamily={font.google.family}
          width="300px"
          color={palette.backgroundComplimentColor}
          placeholder="enter a username"
          hColor={palette.backgroundTertiaryColor}
          aColor={palette.backgroundComplimentColor}
        />
      </Container>
    );
  }

  function renderEmailFormField() {
    return (
      <Container width="100%" customStyles={pageStyles}>
        <StyledLabel
          color={palette.headingSecondaryColor}
          fontFamily={font.google.family}
        >
          email is wack
        </StyledLabel>
        <StyledInput
          value={state.email}
          onChange={handleEmailChange}
          fontFamily={font.google.family}
          width="300px"
          color={palette.backgroundComplimentColor}
          placeholder="that being said, what's your email"
          hColor={palette.backgroundTertiaryColor}
          aColor={palette.backgroundComplimentColor}
        />
      </Container>
    );
  }

  function renderPasswordFormField() {
    return (
      <Container width="100%" customStyles={pageStyles}>
        <StyledLabel
          color={palette.headingSecondaryColor}
          fontFamily={font.google.family}
        >
          password, social security number, weight of soul in grams
        </StyledLabel>
        <StyledInput
          value={state.passwordPlt}
          type="password"
          onChange={handlePasswordChange}
          fontFamily={font.google.family}
          width="300px"
          placeholder="no, just a password"
          color={palette.backgroundComplimentColor}
          hColor={palette.backgroundTertiaryColor}
          aColor={palette.backgroundComplimentColor}
        />
      </Container>
    );
  }

  function renderFormActionButton() {
    return (
      <Container customStyles={pageStyles} margin="8px">
        <Button
          onClick={handleNextFormClick}
          ghost
          backgroundColor={palette.buttonColorOptions[2]}
        >
          {forwardVarText(
            getSafeFontKey(font.google.family),
            currentFormIndex !== formFieldElems.length - 1 ? 'next' : 'submit',
            'span'
          )}
        </Button>
      </Container>
    );
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    // validate then update
    dispatch({ type: 'update-name', payload: e.target.value });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    // validate then update
    dispatch({ type: 'update-password', payload: e.target.value });
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    // validate then update
    dispatch({ type: 'update-email', payload: e.target.value });
  }

  function handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'update-username', payload: e.target.value });
  }

  function handleNextFormClick() {
    if (currentFormIndex !== formFieldElems.length - 1) {
      setCurrentFormIndex((pV) => pV + 1);
    } else {
      // submit
    }
  }

  return (
    <StyledForm color={palette.backgroundComplimentColor}>
      {renderFormTitleSection()}
      {formFieldElems[currentFormIndex]}
      {renderFormActionButton()}
    </StyledForm>
  );
};
