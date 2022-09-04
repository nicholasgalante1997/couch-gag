import { Container } from '@nickgdev/hellerui';
import { useThemeContext } from '../contexts';
import { forwardVarText, getSafeFontKey } from '../utils';
import { LoginForm } from '../components/auth';

const LoginPage = () => {
  const { font, palette } = useThemeContext();
  return (
    <Container asGridParent height="100vh" margin="0 auto" padding="0px">
      <Container
        radius="none"
        height="100%"
        asGridChild
        colSpan={6}
        background={palette.backgroundComplimentColor}
      >
        <LoginForm />
      </Container>
      <Container
        radius="none"
        height="100%"
        asGridChild
        colSpan={6}
        background={palette.backgroundTertiaryColor}
      >
        {forwardVarText(getSafeFontKey(font.google.family), 'sampler', 'h1')}
      </Container>
    </Container>
  );
};

export default LoginPage;
