import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { useThemeContext } from '../contexts';
import {
  forwardVarText,
  getSafeFontKey,
  findNestedParagraphPaletteTheme,
  parseBoldOrItalicVisualJson,
  parseVisualJsonString,
  purgeMarkdownFromJson
} from '../utils';
import { useAboutPageText } from '../store';

export default function About() {
  const { font, palette } = useThemeContext();
  const { main: { title, subtitle, body } } = useAboutPageText();
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
        title,
        'h1',
        {
          customStyles: {
            color: palette.backgroundTertiaryColor
          },
          id: 'cg-about-title-heading'
        }
      )}
      {forwardVarText(
        getSafeFontKey(font.google.family),
        subtitle,
        'p',
        {
          customStyles: {
            color: findNestedParagraphPaletteTheme(palette.paragraphTextColor)
          },
          id: 'cg-about-title-paragraph'
        }
      )}
      <hr style={{width: '100%'}} color={palette.headingPrimaryColor} />
      {
        body.map((p, index) => forwardVarText(
          getSafeFontKey(font.google.family),
          purgeMarkdownFromJson(p),
          parseVisualJsonString(p),
          {
            customStyles: {
              color: parseVisualJsonString(p) === 'p' ? 'white' : palette.backgroundTertiaryColor,
              fontSize: 14,
              lineHeight: 1.5,
              ...(parseVisualJsonString(p) === 'p' ? parseBoldOrItalicVisualJson(p) :  {})
            },
            id: `cg-about-body-block-${index}`
          }
        ))
      }
    </Container>
  );
}
