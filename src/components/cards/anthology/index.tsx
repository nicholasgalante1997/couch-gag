import React from 'react';
import type { AnthologyTileProps } from './types';

import { Container } from '@nickgdev/hellerui';

import { Font } from '../../../components';
import { useBpContext, useThemeContext } from '../../../contexts';
import {
  getSafeFontKey,
  findNestedParagraphPaletteTheme
} from '../../../utils';

import css from './index.module.css';

export const AnthologyTile = (props: AnthologyTileProps) => {
  const { font, palette } = useThemeContext();
  const { breakpointKeyName } = useBpContext();
  const [activeHover, setActiveHover] = React.useState<boolean>(false);

  const { cardKey, desc, title, navigationFn } = props;

  const titleFontRestProps = React.useMemo(
    () => ({
      customStyles: {
        color: activeHover
          ? palette.headingPrimaryColor
          : palette.backgroundTertiaryColor,
        maxWidth: '70%',
        ...(activeHover
          ? {
              paddingLeft: '4px',
              transition: 'padding-left 0.4s',
              fontSize: '18px'
            }
          : {})
      }
    }),
    [activeHover]
  );

  const paragraphFontRestProps = React.useMemo(
    () => ({
      className: css['trunc'],
      customStyles: {
        color: findNestedParagraphPaletteTheme(palette.paragraphTextColor),
        marginTop: '8px',
        maxWidth: '80%',
        ...(activeHover
          ? {
              paddingLeft: '4px',
              fontSize: '16px',
              transition: 'padding-left 0.4s, font-size 0.4s'
            }
          : {
              fontSize: '14px'
            })
      }
    }),
    [activeHover, palette]
  );

  const genreFontRestProps = React.useMemo(
    () => ({
      customStyles: {
        fontSize: activeHover ? '16px' : '14px',
        marginLeft: '0.25rem',
        marginRight: '0.25rem',
        display: 'inline-block',
        color: '#7e667a',
        textDecoration: activeHover ? 'underline' : 'none'
      }
    }),
    [activeHover]
  );

  return (
    <Container
      onMouseEnter={() => setActiveHover(true)}
      onMouseLeave={() => setActiveHover(false)}
      onClick={navigationFn}
      id={'card-parent-div-' + cardKey}
      className={css['story-card']}
      padding="6px"
      width={breakpointKeyName === 'mobile' ? '100%' : '310px'}
      height="240px"
      customStyles={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: '240px',
        maxHeight: '240px',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        ...(breakpointKeyName === 'tablet' || breakpointKeyName === 'mobile'
          ? { borderBottom: '1px solid white' }
          : {})
      }}
    >
      <Container padding="0px" width="100%">
        <Font
          family={getSafeFontKey(font.google.family)}
          impl="h4"
          {...titleFontRestProps}
        >
          {title}
        </Font>
        <Font
          family={getSafeFontKey(font.google.family)}
          impl="p"
          {...paragraphFontRestProps}
        >
          {desc}
        </Font>
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
            props.genres.map((stGen) => (
              <Font family={getSafeFontKey(font.google.family)} impl="span">
                {stGen}
              </Font>
            ))}
        </Container>
      </Container>
    </Container>
  );
};
