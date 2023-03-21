import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { useThemeContext } from '../contexts';
import {
  getSafeFontKey,
  findNestedParagraphPaletteTheme,
  parseBoldOrItalicVisualJson,
  parseVisualJsonString,
  purgeMarkdownFromJson
} from '../utils';
import { useAboutPageText } from '../store';
import { Font } from '../components';

export default function About() {
  const { font, palette } = useThemeContext();
  const {
    main: { title, subtitle, body }
  } = useAboutPageText();
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
        minHeight: '88.2vh',
        overflow: 'hidden'
      }}
    >
      <Font
        family={getSafeFontKey(font.google.family)}
        impl="h1"
        {...{
          customStyles: {
            color: palette.backgroundTertiaryColor
          },
          id: 'cg-about-title-heading'
        }}
      >
        {title}
      </Font>
      <Font
        family={getSafeFontKey(font.google.family)}
        impl="p"
        {...{
          customStyles: {
            color: findNestedParagraphPaletteTheme(palette.paragraphTextColor)
          },
          id: 'cg-about-title-paragraph'
        }}
      >
        {subtitle}
      </Font>
      <hr style={{ width: '100%' }} color={palette.headingPrimaryColor} />
      {body.map((p, index) => (
        <Font
          family={getSafeFontKey(font.google.family)}
          impl={parseVisualJsonString(p)}
          {...{
            customStyles: {
              color:
                parseVisualJsonString(p) === 'p'
                  ? 'white'
                  : palette.backgroundTertiaryColor,
              fontSize: 14,
              lineHeight: 1.5,
              ...(parseVisualJsonString(p) === 'p'
                ? parseBoldOrItalicVisualJson(p)
                : {})
            },
            id: `cg-about-body-block-${index}`
          }}
        >
          {purgeMarkdownFromJson(p)}
        </Font>
      ))}
    </Container>
  );
}
