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
  const {
    title,
    subtitle,
    episodeKey,
    imgSrc = 'https://via.placeholder.com/90x90'
  } = props;
  const navigate = useNavigate();
  return (
    <Container asGridParent padding="0.25rem">
      <Container asGridChild colSpan={1}>
        <img
          src={imgSrc}
          height={'100%'}
          width={'100%'}
          style={{ borderRadius: '4px', objectFit: 'scale-down' }}
        />
      </Container>
      <Container asGridChild colSpan={10}>
        <Heading color="#fff" as="h6">
          {title}
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
          width="24px"
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
          <ArrowRight height="16px" width="16px" fill="#ffffff" />
        </Button>
      </Container>
    </Container>
  );
}
