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
import { Font, TwoColStaggered } from '../components';

export default function About() {
  const { font, palette, darkMode } = useThemeContext();
  const {
    main: { title, subtitle, widget_one }
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
        overflow: 'scroll'
      }}
    >
      <Container height="40vh" width="100%" customStyles={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Font
          family={getSafeFontKey("Caveat")}
          impl="h1"
          {...{
            customStyles: {
              color: darkMode ? palette.backgroundTertiaryColor : palette.headingPrimaryColor,
              fontSize: '5rem'
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
              color: findNestedParagraphPaletteTheme(palette.paragraphTextColor),
              fontSize: '1rem',
              fontStyle: 'italic'
            },
            id: 'cg-about-title-paragraph'
          }}
        >
          {subtitle}
        </Font>
      </Container>
      <hr style={{ width: '100%' }} color={palette.headingPrimaryColor} />
      <TwoColStaggered 
        styles={{ marginTop: "-8px", marginRight: "-9px" }}
        leftSpan={7}
        rightSpan={5}
        leftContainerProps={{
          customStyles: {
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }
        }}
        rightContainerProps={{
          customStyles: {
            background: darkMode ? palette.backgroundTertiaryColor: palette.headingPrimaryColor,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
        rightNode={
          <Font 
            family={"Caveat - v17"} 
            impl="h1" 
            customStyles={{ 
              fontSize: '1.5rem', 
              textAlign: 'center', 
              maxWidth: '80%' 
            }}
          >
            {widget_one.title}
        </Font>}
      />
    </Container>
  );
}
