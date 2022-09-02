import { Container, _heller_base } from '@nickgdev/hellerui';
import { useRouter } from 'next/router';
import { useThemeContext } from '../../contexts';
import { forwardVarText, getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated/hoverable';
import navJson from './data/nav.json';

export function LinkBar() {
  const { push: redirect } = useRouter();
  const { font, palette } = useThemeContext();
  const forwardNavEventDest = (d: string) => redirect(d);
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
