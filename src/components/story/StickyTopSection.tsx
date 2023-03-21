import React from 'react';
import { Container } from '@nickgdev/hellerui';
import { useThemeContext } from '../../contexts';
import { getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated/hoverable';
import { Font } from '../font';

const actions = [
  {
    type: 'share'
  },
  {
    type: 'bookmark'
  }
] as const;

export function StickyTopSection(props: {
  isViewable: boolean;
  title: string;
  shortSum: string;
}): JSX.Element {
  const { palette, font, darkMode } = useThemeContext();
  return props.isViewable ? (
    <Container
      id="sp-sticky-top-sect"
      width="100%"
      height="48px"
      background={palette.backgroundComplimentColor}
      customStyles={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}
    >
      <Font
        family={getSafeFontKey(font.google.family)}
        impl="h4"
        {...{
          customStyles: {
            color: 'black'
          }
        }}
      >
        {props.title}
      </Font>
      <Font
        family={getSafeFontKey(font.google.family)}
        impl="p"
        {...{
          customStyles: {
            color: 'black',
            maxWidth: '50%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }
        }}
      >
        {props.shortSum}
      </Font>
      <Container
        customStyles={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        {actions.map((action) => (
          <Hoverable
            from={{ color: palette.backgroundTertiaryColor }}
            to={{ color: palette.headingSecondaryColor, fontWeight: 'bold' }}
          >
            <Font
              family={getSafeFontKey(font.google.family)}
              impl="span"
              {...{
                customStyles: {
                  fontStyle: 'italic',
                  marginLeft: '4px',
                  marginRight: '4px'
                }
              }}
            >
              {props.shortSum}
            </Font>
          </Hoverable>
        ))}
      </Container>
    </Container>
  ) : (
    <div id="zeroed" />
  );
}
