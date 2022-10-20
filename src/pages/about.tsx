import React from 'react';
import { Container, Page } from '@nickgdev/hellerui';

import { OneCol } from '../components/widgets/OneCol.widget';
import { useThemeContext } from '../contexts';
import {
  forwardVarText,
  getSafeFontKey,
  MARKDOWN_COMPONENT_MAPPING_FN
} from '../utils';

const letter_from_the_editor_markdown = `
#### A letter from the editor
---


` as const;

export default function About() {
  const { font, palette } = useThemeContext();
  function renderAboutWidget() {
    return (
      <Container
        customStyles={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Page
          contentEngine="markdown"
          dangerouslyOverridePageHeading={{ headingNode: <></> }}
          dividerProps={{
            fadeColor: palette.backgroundComplimentColor,
            focusColor: palette.backgroundComplimentColor
          }}
          title=""
          customComponentMap={{
            ...MARKDOWN_COMPONENT_MAPPING_FN(font, palette),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            h4: ({ _node, ...rest }: any) =>
              forwardVarText(
                getSafeFontKey(font.google.family),
                rest.children,
                'h4',
                {
                  customStyles: {
                    color: palette.headingSecondaryColor,
                    fontSize: '48px'
                  }
                }
              )
          }}
          content={letter_from_the_editor_markdown}
        />
      </Container>
    );
  }

  return (
    <Container
      width="100%"
      height="90vh"
      id="cg-about-page-wrapping-container"
      customStyles={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        paddingTop: '2.15rem'
      }}
    >
      <OneCol
        widgetKey="about-page-widget-one"
        height="100%"
        containerProps={{
          customStyles: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            overflow: 'scroll'
          }
        }}
        childNode={renderAboutWidget()}
      />
    </Container>
  );
}
