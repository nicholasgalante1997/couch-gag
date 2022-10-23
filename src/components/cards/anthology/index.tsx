import type { AnthologyTileProps } from './types';

import { Button, Container } from '@nickgdev/hellerui';

import { useThemeContext } from '../../../contexts';
import { CouchGagBreakpoints, useInlineMediaQuery } from '../../../hooks';
import { forwardVarText, getSafeFontKey } from '../../../utils';

import css from './index.module.css';
import { useState } from 'react';

export const AnthologyTile = (props: AnthologyTileProps) => {
  const { font, palette } = useThemeContext();
  const media = useInlineMediaQuery();
  const [activeHover, setActiveHover] = useState<boolean>(false);

  const { cardKey, desc, title, navigationFn } = props;
  return (
    <Container
      onMouseEnter={() => setActiveHover(true)}
      onMouseLeave={() => setActiveHover(false)}
      id={'card-parent-div-' + cardKey}
      className={css['story-card']}
      asGridChild
      colSpan={media.breakpoint === CouchGagBreakpoints.DESKTOP ? 4 : 12}
      padding="0px"
      height="33vh"
      customStyles={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: '33vh',
        maxHeight: '33vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }}
    >
      <Container padding="0px" width="100%">
        {forwardVarText(getSafeFontKey(font.google.family), title, 'h3', {
          customStyles: {
            color: palette.headingSecondaryColor,
            maxWidth: '50%'
          }
        })}
        {forwardVarText(getSafeFontKey(font.google.family), desc, 'p', {
          className: css['trunc'],
          customStyles: {
            color: palette.paragraphTextColor,
            marginTop: '8px',
            maxWidth: '70%',
            width: '70%',
            minWidth: '70%',
            fontSize: '14px'
          }
        })}
      </Container>
      <Container
        padding="0px"
        width="100%"
        customStyles={{
          marginTop: '8px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Container
          customStyles={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          {props.genres &&
            props.genres.map((stGen) =>
              forwardVarText(
                getSafeFontKey(font.google.family),
                stGen,
                'span',
                {
                  customStyles: {
                    fontSize: '14px',
                    marginLeft: '0.25rem',
                    marginRight: '0.25rem',
                    display: 'inline-block',
                    color: activeHover
                      ? palette.buttonColorOptions[0]
                      : palette.headingPrimaryColor,
                    textDecoration: activeHover ? 'underline' : 'none'
                  }
                }
              )
            )}
        </Container>
        <Button
          backgroundColor={palette.backgroundTertiaryColor}
          onClick={navigationFn}
          style={{ marginBottom: '20px', marginRight: '20px' }}
          ghost
        >
          {forwardVarText(
            getSafeFontKey(font.google.family),
            'Get Started',
            'span',
            {
              customStyles: {
                color: palette.paragraphTextColor
              }
            }
          )}
        </Button>
      </Container>
    </Container>
  );
};
