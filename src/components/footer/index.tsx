import { Container } from '@nickgdev/hellerui';
import { useRouter } from 'next/router';
import { useThemeContext } from '../../contexts';
import { getSafeFontKey } from '../../utils';
import { useFooterText } from '../../store';
import { footerContainerStyles } from './styles';
import { replaceStringVariables } from '../../utils/string';
import { Font } from '../font';

export function Footer() {
  const { font, palette } = useThemeContext();
  const {
    left: { banner: leftBanner },
    right: { banner: rightBanner }
  } = useFooterText();
  const router = useRouter();
  function getPageNumber(loc: string): string {
    switch (loc) {
      case '/':
        return '01';
      default:
        return '08';
    }
  }
  return (
    <Container
      id="couch-gag-footer-container"
      customStyles={footerContainerStyles}
      padding="1rem"
      width="100%"
    >
      <Font
        family={getSafeFontKey(font.google.family)}
        impl="h3"
        {...{
          customStyles: {
            color: palette.headingSecondaryColor
          }
        }}
      >
        {replaceStringVariables(leftBanner, {
          pageNumber: getPageNumber(router.pathname)
        })}
      </Font>
      <Font
        family={getSafeFontKey(font.google.family)}
        impl="p"
        {...{
          customStyles: {
            color: palette.paragraphTextColor
          }
        }}
      >
        {replaceStringVariables(rightBanner, {
          pageNumber: getPageNumber(router.pathname)
        })}
      </Font>
    </Container>
  );
}
