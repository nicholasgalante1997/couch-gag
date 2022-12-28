import { useRouter } from 'next/router';
import React from 'react';
import * as CSS from 'csstype';
import { useThemeContext } from '../../contexts';
import { useNavbarData } from '../../store';
import { forwardVarText, getSafeFontKey } from '../../utils';
import { Hoverable } from '../animated/hoverable';

type TitleProps = {
  mobile?: boolean;
  mobileToggleVisibleStateFn?: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Title(props: TitleProps) {
  const { push: redirect } = useRouter();
  const { palette } = useThemeContext();
  const { mainTitle } = useNavbarData();
  const { mobile, mobileToggleVisibleStateFn } = props;

  function onClickBrowser() {
    redirect('/');
  }

  function onClickMobile() {
    if (mobile && typeof mobileToggleVisibleStateFn !== 'undefined') {
      mobileToggleVisibleStateFn((prevState) => !prevState);
    }
  }

  const titleStyles: CSS.Properties = {};

  if (mobile) {
    titleStyles.fontSize = '3rem';
  }

  return (
    <Hoverable
      from={{ color: palette.headingPrimaryColor, fontSize: '1.15rem' }}
      to={{ color: palette.backgroundTertiaryColor, fontSize: '1.25rem' }}
    >
      {forwardVarText(getSafeFontKey('Caveat'), mainTitle, 'h3', {
        onClick: mobile ? onClickMobile : onClickBrowser,
        customStyles: {
          ...titleStyles
        }
      })}
    </Hoverable>
  );
}
