import { Container } from '@nickgdev/hellerui';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useThemeContext } from '../../contexts';
import { useNavbarData } from '../../store';
import { getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated/hoverable';
import { ToggleSwitchProps, ToggleSwitch } from '../animated/toggle';
import AvatarPNG from './avatar.png';
import { Font } from '../font';
import Image from 'next/image';

const VerticalRule = styled.div<{ darkMode: boolean }>`
  background-color: ${props => props.darkMode ? 'white' : 'black'};
  height: 40px;
  width: 1px;
  margin-left: 16px;
  margin-right: 8px;
`;

const EmptyAvatar = styled.div<{ darkMode: boolean }>`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background: green;
`

export function LinkBar(props: {} & ToggleSwitchProps) {
  const { push: redirect, pathname } = useRouter();
  const { font, palette, darkMode } = useThemeContext();
  const { links } = useNavbarData();
  const forwardNavEventDest = (d: string) => redirect(d);

  return (
    <Container customStyles={{ display: 'flex', flexDirection: 'row' }}>
      {links.map((l) => (
        <Hoverable
          key={l.plainText}
          from={{
            color:
              pathname === l.localHref
                ? palette.headingPrimaryColor
                : Array.isArray(palette.paragraphTextColor)
                ? palette.paragraphTextColor[0]
                : palette.paragraphTextColor
          }}
          to={{
            color: darkMode ? palette.backgroundTertiaryColor : palette.headingPrimaryColor
          }}
        >
          <Font
            family={getSafeFontKey(font.google.family)}
            impl="b"
            {...{
              onClick: () => forwardNavEventDest(l.localHref),
              customStyles: {
                marginLeft: '0.25rem',
                paddingRight: '0.25rem',
                fontSize: 'inherit'
              },
              key: l.plainText,
              className: 'nav-link'
            }}
          >
            {l.plainText}
          </Font>
        </Hoverable>
      ))}
      <VerticalRule darkMode={darkMode} />
      <Container height="100%" customStyles={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', position: 'relative', zIndex: 1, overflow: 'visible' }}>
        <ToggleSwitch {...props} />
      </Container>
    </Container>
  );
}
