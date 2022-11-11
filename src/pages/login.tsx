import { Container } from '@nickgdev/hellerui';
import { pageStyles } from '../utils';
import { LoginForm } from '../components/auth';

const LoginPage = () => {
  return (
    <Container
      customStyles={pageStyles}
      height="90vh"
      margin="0 auto"
      padding="0px"
    >
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
