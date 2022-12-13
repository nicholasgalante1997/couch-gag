import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { useThemeContext } from '../contexts';
import { forwardVarText, getSafeFontKey, findNestedParagraphPaletteTheme } from '../utils';

export default function About() {
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
        minHeight: '88.2vh',
        overflow: 'hidden'
      }}
    >
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'A letter from the editor',
        'h1',
        {
          customStyles: {
            color: palette.backgroundTertiaryColor
          }
        }
      )}
      {forwardVarText(
        getSafeFontKey(font.google.family),
        'Edition One, Colloquial Title: Flagship; 12/1/2022',
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
