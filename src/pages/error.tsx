import {
  Container,
  HellerDivider,
  Typography,
  Button,
  Break
} from '@nickgdev/hellerui';
import { useNavigate } from 'react-router';
import { pageStyles } from '../utils';

const { Heading, Paragraph } = Typography;

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container customStyles={pageStyles}>
      <Heading color="deeppink" as="h2">
        404: Page Not Found
      </Heading>
      <hr color="white" style={{ width: '50%' }} />
      <Paragraph color="white" italic>
        How'd you get here?
      </Paragraph>
      <Break />
      <Button onClick={() => navigate('/')} ghost backgroundColor="#ffffff">
        back to home
      </Button>
    </Container>
  );
};
