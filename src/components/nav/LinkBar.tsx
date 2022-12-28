import { Container } from '@nickgdev/hellerui';
import { useRouter } from 'next/router';
import { useThemeContext } from '../../contexts';
import { useNavbarData } from '../../store';
import { forwardVarText, getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated/hoverable';

export function LinkBar() {
  const { push: redirect, pathname } = useRouter();
  const { font, palette } = useThemeContext();
  const { links } = useNavbarData();
  const forwardNavEventDest = (d: string) => redirect(d);

  return (
    <Container customStyles={{ display: 'flex', flexDirection: 'row' }}>
      {links.map((l) => (
        <Hoverable
          key={l.plainText}
          from={{
            color:
              pathname === l.localHref
                ? palette.backgroundTertiaryColor
                : palette.headingSecondaryColor
          }}
          to={{
            color: palette.headingPrimaryColor
          }}
        >
          {forwardVarText(
            getSafeFontKey(font.google.family),
            l.plainText,
            'b',
            {
              onClick: () => forwardNavEventDest(l.localHref),
              customStyles: {
                marginLeft: '0.25rem',
                paddingRight: '0.25rem',
                fontSize: 'inherit'
              },
              key: l.plainText,
              className: 'nav-link'
            }
          )}
        </Hoverable>
      ))}
    </Container>
  );
}
