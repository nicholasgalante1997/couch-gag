import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { useThemeContext } from '../contexts';
import { getSafeFontKey, findNestedParagraphPaletteTheme } from '../utils';
import { Font } from '../components';

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
        maxWidth: '900px',
        height: '88.2vh',
        overflow: 'hidden'
      }}
    >
      <Font
        family={getSafeFontKey(font.google.family)}
        impl="h1"
        {...{
          customStyles: {
            color: palette.backgroundTertiaryColor
          }
        }}
      >
        Couch Gag is looking for writers, marketers, and developers.
      </Font>
      <Font
        family={getSafeFontKey(font.google.family)}
        impl="p"
        {...{
          customStyles: {
            color: findNestedParagraphPaletteTheme(palette.paragraphTextColor)
          }
        }}
      >
        We have appeals laid out below, as to why joining Couch Gag is what you
        were born to do.
      </Font>
    </Container>
  );
}

export default RecruitmentPage;
