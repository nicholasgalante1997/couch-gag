import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { useThemeContext } from '../contexts';
import { forwardVarText, getSafeFontKey, findNestedParagraphPaletteTheme } from '../utils';

function RecruitmentPage() {
  const { font, palette } = useThemeContext();
  return (
    <Container
      padding="10px"
      customStyles={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        justifySelf: 'center',
        width: '90%',
        height: '88.2vh',
        overflow: 'hidden'
      }}
    >
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'Couch Gag is looking for writers, marketers, and developers.',
        'h1',
        {
          customStyles: {
            color: palette.backgroundTertiaryColor
          }
        }
      )}
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'We have appeals laid out below, as to why joining Couch Gag is what you were born to do.',
        'p',
        {
          customStyles: {
            color: findNestedParagraphPaletteTheme(palette.paragraphTextColor)
          }
        }
      )}
    </Container>
  );
}

export default RecruitmentPage;
