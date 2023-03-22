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
import { _lasercat_ } from '@nickgdev/couch-gag-common-lib';

export const AnthologyTile = (props: AnthologyTileProps) => {
  const { font, palette, darkMode } = useThemeContext();
  const { breakpointKeyName } = useBpContext();
  const [activeHover, setActiveHover] = React.useState<boolean>(false);

  const { cardKey, desc, title, navigationFn } = props;

  const titleFontRestProps = {
    customStyles: {
      color: activeHover
        ? darkMode ? _lasercat_.prp_light : palette.headingPrimaryColor
        : darkMode ? palette.backgroundTertiaryColor : palette.headingSecondaryColor,
      maxWidth: '70%',
      ...(activeHover
        ? {
            paddingLeft: '4px',
            transition: 'padding-left 0.4s',
            fontSize: '18px'
          }
        : {})
    }
  };

  const paragraphFontRestProps = {
    className: css['trunc'],
    customStyles: {
      color: activeHover ? darkMode ? palette.backgroundTertiaryColor : "#fff" : findNestedParagraphPaletteTheme(palette.paragraphTextColor),
      marginTop: '8px',
      maxWidth: '80%',
      ...(activeHover
        ? {
            paddingLeft: '4px',
            fontSize: '16px',
            transition: 'padding-left 0.4s, font-size 0.4s',
          }
        : {
            fontSize: '14px'
          })
    }
  };

  const genreFontRestProps = {
    customStyles: {
      fontSize: activeHover ? '16px' : '14px',
      marginLeft: '0.25rem',
      marginRight: '0.25rem',
      display: 'inline-block',
      color: activeHover ? darkMode ? "#fff" : "#000" : '#7e667a',
      textDecoration: activeHover ? 'underline' : 'none'
    }
  };

  return (
    <Container
      onMouseEnter={() => setActiveHover(true)}
      onMouseLeave={() => setActiveHover(false)}
      onClick={navigationFn}
      id={'card-parent-div-' + cardKey}
      className={css['story-card']}
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
        paddingTop: "1rem",
        paddingBottom: "0.25rem",
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        background: activeHover ? darkMode ? palette.backgroundComplimentColor : _lasercat_.prp_light : undefined,
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
              <Font family={getSafeFontKey(font.google.family)} impl="span" {...genreFontRestProps}>
                {stGen}
              </Font>
            ))}
        </Container>
      </Container>
    </Container>
  );
};
