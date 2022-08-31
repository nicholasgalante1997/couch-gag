import { useRouter } from 'next/router';
import { Container, Button, Break } from '@nickgdev/hellerui';

import { useThemeContext } from '../contexts';
import { pageStyles, getSafeFontKey, forwardVarText } from '../utils';

export const ErrorPage = () => {
  const { push: redirect } = useRouter();
  const { font, palette } = useThemeContext();
  return (
    <Container customStyles={pageStyles}>
      {forwardVarText(
        getSafeFontKey(font.google.family),
        '404: Page Not Found',
        'h2',
        { customStyles: { color: palette.headingPrimaryColor } }
      )}
      <hr color="white" style={{ width: '50%' }} />
      {forwardVarText(
        getSafeFontKey(font.google.family),
        "How'd you get here?",
        'p',
        {
          customStyles: {
            color: palette.paragraphTextColor,
            fontStyle: 'italic'
          }
        }
      )}
      <Break />
      <Button onClick={() => redirect('/')} ghost backgroundColor="#ffffff">
        {forwardVarText(
          getSafeFontKey(font.google.family),
          'back to home',
          'p',
          { customStyles: { color: palette.paragraphTextColor } }
        )}
      </Button>
    </Container>
  );
};
