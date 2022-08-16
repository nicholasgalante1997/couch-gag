import { useNavigate } from 'react-router-dom';
import { Container, Button, _heller_base } from '@nickgdev/hellerui';

import { useThemeContext } from '../contexts';
import { forwardVarText, getSafeFontKey } from '../utils';
import { StoryRowProps } from '../types';

import ArrowRight from './ArrowRight.svg';

export function StoryRow(props: StoryRowProps) {
  const {
    title,
    subtitle,
    episodeKey,
    imgSrc = 'https://via.placeholder.com/90x90'
  } = props;
  const { font } = useThemeContext();
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
        {forwardVarText(getSafeFontKey(font.google.family), title, 'h2', {
          customStyles: { color: '#fff' }
        })}
        {forwardVarText(getSafeFontKey(font.google.family), subtitle, 'p', {
          customStyles: {
            color: _heller_base.colors.majorMajor.gainsboro,
            fontWeight: 'bold',
            fontSize: 14,
            marginTop: '0.5rem',
            marginBottom: '0.5rem'
          }
        })}
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
