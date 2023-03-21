import { Container } from '@nickgdev/hellerui';
import { useRouter } from 'next/router';
import { useThemeContext } from '../../contexts';
import { useNavbarData } from '../../store';
import { getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated/hoverable';
import { Font } from '../font';

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
                ? palette.headingPrimaryColor
                : Array.isArray(palette.paragraphTextColor)
                ? palette.paragraphTextColor[0]
                : palette.paragraphTextColor
          }}
          to={{
            color: palette.backgroundTertiaryColor
          }}
        >
          <Font
            family={getSafeFontKey(font.google.family)}
            impl="b"
            {...{
              onClick: () => forwardNavEventDest(l.localHref),
              customStyles: {
                marginLeft: '0.25rem',
                paddingRight: '0.25rem',
                fontSize: 'inherit'
              },
              key: l.plainText,
              className: 'nav-link'
            }}
          >
            {l.plainText}
          </Font>
        </Hoverable>
      ))}
    </Container>
  );
}
