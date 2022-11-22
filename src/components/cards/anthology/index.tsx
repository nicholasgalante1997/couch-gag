import type { AnthologyTileProps } from './types';

import { Container } from '@nickgdev/hellerui';

import { useBpContext, useThemeContext } from '../../../contexts';
import { forwardVarText, getSafeFontKey } from '../../../utils';

import css from './index.module.css';
import { useState } from 'react';

export const AnthologyTile = (props: AnthologyTileProps) => {
  const { font, palette } = useThemeContext();
  const { breakpointKeyName } = useBpContext();
  const [activeHover, setActiveHover] = useState<boolean>(false);

  const { cardKey, desc, title, navigationFn } = props;
  return (
    <Container
      onMouseEnter={() => setActiveHover(true)}
      onMouseLeave={() => setActiveHover(false)}
      onClick={navigationFn}
      id={'card-parent-div-' + cardKey}
      className={css['story-card']}
      asGridChild
      colSpan={
        breakpointKeyName === 'mobile' || breakpointKeyName === 'tablet'
          ? 12
          : 4
      }
      padding="8px"
      height="33vh"
      customStyles={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: '33vh',
        maxHeight: '33vh',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        ...(breakpointKeyName === 'tablet' || breakpointKeyName === 'mobile'
          ? { borderBottom: '1px solid white' }
          : {})
      }}
    >
      <Container padding="0px" width="100%">
        {forwardVarText(getSafeFontKey(font.google.family), title, 'h3', {
          customStyles: {
            color: activeHover ? '#7e667a' : palette.headingSecondaryColor,
            maxWidth: '50%',
            ...(activeHover ? {
              paddingLeft: '4px',
              transition: 'padding-left 0.4s'
            } : {})
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
            fontSize: '14px',
            ...(activeHover ? {
              paddingLeft: '4px',
              transition: 'padding-left 0.4s'
            } : {})
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
      </Container>
    </Container>
  );
};
