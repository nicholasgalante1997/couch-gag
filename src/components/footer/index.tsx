import { Container } from '@nickgdev/hellerui';
import { useThemeContext } from '../../contexts';
import { forwardVarText, getSafeFontKey } from '../../utils';
import { useFooterText } from '../../store';
import { footerContainerStyles } from './styles';
import { replaceStringVariables } from '../../utils/string';
import { useRouter } from 'next/router';

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
      {forwardVarText(
        getSafeFontKey(font.google.family),
        replaceStringVariables(leftBanner, {
          pageNumber: getPageNumber(router.pathname)
        }),
        'h3',
        {
          customStyles: {
            color: palette.headingSecondaryColor
          }
        }
      )}
      {forwardVarText(
        getSafeFontKey(font.google.family),
        replaceStringVariables(rightBanner, {
          pageNumber: getPageNumber(router.pathname)
        }),
        'p',
        {
          customStyles: {
            color: palette.paragraphTextColor
          }
        }
      )}
    </Container>
  );
}
