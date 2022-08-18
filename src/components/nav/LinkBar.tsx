import { Container, _heller_base } from '@nickgdev/hellerui';
import { useNavigate } from 'react-router';
import { useThemeContext } from '../../contexts';
import { forwardVarText, getSafeFontKey } from '../../utils';
import { Hoverable } from '../Hoverable';
import navJson from './data/nav.json';

export function LinkBar() {
  const navigate = useNavigate();
  const { font, palette } = useThemeContext();
  const forwardNavEventDest = (d: string) => navigate(d);
  return (
    <Container customStyles={{ display: 'flex', flexDirection: 'row' }}>
      {navJson.links.map((l) => (
        <Hoverable>
          {forwardVarText(
            getSafeFontKey(font.google.family),
            l.plainText,
            'b',
            {
              onClick: () => forwardNavEventDest(l.localHref),
              customStyles: {
                color: palette.headingSecondaryColor,
                marginLeft: '0.25rem',
                paddingRight: '0.25rem',
                fontSize: 'inherit'
              }
            }
          )}
        </Hoverable>
      ))}
    </Container>
  );
}
