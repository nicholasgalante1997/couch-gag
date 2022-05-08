import {
  Container,
  Typography,
  Button,
  _heller_base
} from '@nickgdev/hellerui';
import { useNavigate } from 'react-router-dom';
import { StoryRowProps } from '../types';
import ArrowRight from './ArrowRight.svg';
const { Heading, Paragraph } = Typography;

export function StoryRow(props: StoryRowProps) {
  const { title, subtitle, index, episodeKey, seasonKey } = props;
  const navigate = useNavigate();
  return (
    <Container asGridParent padding="0.25rem">
      <Container asGridChild colSpan={4}>
        <Heading color="#fff" as="h6">
          {index + 1}. {title}
        </Heading>
        <Paragraph
          customStyles={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
          bold
          color={_heller_base.colors.majorMajor.gainsboro}
          fontSize={14}
        >
          {subtitle}
        </Paragraph>
        <Button
          width="100px"
          ghost
          size="sm"
          onClick={() =>
            navigate(`/story/season-one?seasonKey=01&episodeKey=${episodeKey}`)
          }
          backgroundColor={_heller_base.colors.mcwatt.flickrPink}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          Read Here
          <ArrowRight height="16px" width="16px" fill="#ffffff" />
        </Button>
      </Container>
    </Container>
  );
}
